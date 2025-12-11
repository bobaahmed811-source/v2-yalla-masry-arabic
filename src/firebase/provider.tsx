
'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener'
import { useRouter } from 'next/navigation';
import { createInitialProgress } from '@/lib/course-utils';


interface FullUser extends User {
    nilePoints?: number;
}
interface FirebaseProviderProps {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

// Internal state for user authentication
interface UserAuthState {
  user: FullUser | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  areServicesAvailable: boolean; // True if core services (app, firestore, auth instance) are provided
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null; // The Auth service instance
  // User authentication state
  user: FullUser | null;
  isUserLoading: boolean; // True during initial auth check
  userError: Error | null; // Error from auth listener
}

// Return type for useFirebase()
export interface FirebaseServicesAndUser {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  user: FullUser | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// Return type for useUser() - specific to user auth state
export interface UserHookResult { 
  user: FullUser | null;
  isUserLoading: boolean;
  userError: Error | null;
  firestore?: Firestore;
}

// React Context
export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

/**
 * FirebaseProvider manages and provides Firebase services and user authentication state.
 */
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  auth,
}) => {
  const router = useRouter();
  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    user: null,
    isUserLoading: true, // Start loading until first auth event
    userError: null,
  });

  useEffect(() => {
    if (!auth || !firestore) {
      setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Auth or Firestore service not provided.") });
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          // --- User Profile Hydration Logic ---
          // When a user signs in, their `firebaseUser` object might be minimal.
          // We immediately fetch their corresponding document from the `/users/{userId}` collection in Firestore.
          // This document contains richer profile information, like their pharaonic `alias` and `nilePoints`.

          const userDocRef = doc(firestore, 'users', firebaseUser.uid);
          
          try {
            const userDoc = await getDoc(userDocRef);
            let userData: DocumentData | undefined;
            
            if (userDoc.exists()) {
              // **Scenario 1: Existing User**
              // The user's document was found. We extract its data.
              userData = userDoc.data();
            } else {
              // **Scenario 2: New User Sign-Up**
              // No document exists, so this is their first login. We must create their profile.
              // This is critical for the app to function, as many parts rely on this profile data.
              console.log(`User document for ${firebaseUser.uid} not found. Creating a new profile...`);
              const newUserDoc = {
                  id: firebaseUser.uid,
                  email: firebaseUser.email,
                  name: firebaseUser.displayName || 'New Queen', // Use name from sign-up form, fallback to default.
                  alias: firebaseUser.displayName || `ملكة ${firebaseUser.uid.substring(0,5)}`, // The 'alias' will be the official displayName.
                  registrationDate: new Date().toISOString(),
                  nilePoints: 0,
              };
              await setDoc(userDocRef, newUserDoc);
              userData = newUserDoc;
              
              // For a new user, we also create their initial course progress document.
              await createInitialProgress(firestore, firebaseUser.uid);

              // Since this is a new user, we redirect them to the 'goals' page for onboarding.
               router.push('/goals');
            }
            
            // **Hydration Step**
            // We merge the basic `firebaseUser` with our rich `userData` from Firestore.
            // The `displayName` is explicitly set from the `alias` field in our database,
            // ensuring it's the "official" pharaonic name used throughout the app.
            const fullUser: FullUser = {
              ...firebaseUser,
              nilePoints: userData?.nilePoints ?? 0,
              displayName: userData?.alias || firebaseUser.displayName, // Prioritize the database alias.
            };

            setUserAuthState({ user: fullUser, isUserLoading: false, userError: null });

          } catch (error) {
             console.error("Error during user profile hydration:", error);
             // If hydration fails, we still provide the basic user object to avoid a full crash.
             setUserAuthState({ user: firebaseUser as FullUser, isUserLoading: false, userError: error as Error });
          }

        } else {
          // User is signed out, clear all state.
          setUserAuthState({ user: null, isUserLoading: false, userError: null });
        }
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    return () => unsubscribe();
  }, [auth, firestore, router]);

  const contextValue = useMemo((): FirebaseContextState => {
    const servicesAvailable = !!(firebaseApp && firestore && auth);
    return {
      areServicesAvailable: servicesAvailable,
      firebaseApp: servicesAvailable ? firebaseApp : null,
      firestore: servicesAvailable ? firestore : null,
      auth: servicesAvailable ? auth : null,
      user: userAuthState.user,
      isUserLoading: userAuthState.isUserLoading,
      userError: userAuthState.userError,
    };
  }, [firebaseApp, firestore, auth, userAuthState]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseServicesAndUser => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }

  if (!context.areServicesAvailable || !context.firebaseApp || !context.firestore || !context.auth) {
    throw new Error('Firebase core services not available. Check FirebaseProvider props.');
  }

  return {
    firebaseApp: context.firebaseApp,
    firestore: context.firestore,
    auth: context.auth,
    user: context.user,
    isUserLoading: context.isUserLoading,
    userError: context.userError,
  };
};

export const useAuth = (): Auth | null => {
  const context = useContext(FirebaseContext);
   if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseProvider.');
  }
  return context.auth;
};

export const useFirestore = (): Firestore | null => {
  const context = useContext(FirebaseContext);
   if (context === undefined) {
    throw new Error('useFirestore must be used within a FirebaseProvider.');
  }
  return context.firestore;
};

export const useFirebaseApp = (): FirebaseApp | null => {
  const context = useContext(FirebaseContext);
   if (context === undefined) {
    throw new Error('useFirebaseApp must be used within a FirebaseProvider.');
  }
  return context.firebaseApp;
};

type MemoFirebase <T> = T & {__memo?: boolean};

export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T | (MemoFirebase<T>) {
  const memoized = useMemo(factory, deps);
  
  if(typeof memoized !== 'object' || memoized === null) return memoized;
  if(!('__memo' in memoized)) {
     (memoized as MemoFirebase<T>).__memo = true;
  }
  
  return memoized;
}


export const useUser = (includeFirestore = false): UserHookResult => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a FirebaseProvider.');
  }
  
  const { user, isUserLoading, userError, firestore } = context;
  
  if (includeFirestore) {
    return { user, isUserLoading, userError, firestore: firestore ?? undefined };
  }
  
  return { user, isUserLoading, userError };
};
    