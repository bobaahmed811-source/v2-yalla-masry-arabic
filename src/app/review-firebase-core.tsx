
'use client';

/**
 * =================================================================================================
 * FILE: src/firebase/hooks.tsx
 * PURPOSE: Custom hooks to access Firebase services and the authenticated user.
 * =================================================================================================
 */

import { useContext, useState, useEffect, createContext, useMemo, type ReactNode } from 'react';
import { onAuthStateChanged, type User, type Auth } from 'firebase/auth';
import { doc, getDoc, type Firestore, DocumentReference, CollectionReference, Query, DocumentData, onSnapshot, FirestoreError, QuerySnapshot } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';

// Simplified FirebaseContext for this review file
interface FirebaseContextValue {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  firebaseApp: null,
  auth: null,
  firestore: null,
});


function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export const useAuth = () => useFirebase().auth;
export const useFirestore = () => useFirebase().firestore;

interface UserData {
  [key: string]: any;
}

export function useUser() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth) {
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser(user);
          if (firestore) {
            const userDocRef = doc(firestore, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              setUserData(userDoc.data());
            } else {
              console.warn("User document doesn't exist in Firestore.");
              setUserData(null);
            }
          }
        } else {
          setUser(null);
          setUserData(null);
        }
      } catch (e: any) {
        setError(e);
      } finally {
        setIsUserLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, firestore]);

  const enhancedUser = user ? { ...user, ...userData } : null;
  return { user: enhancedUser, isUserLoading, error };
}


/**
 * =================================================================================================
 * FILE: src/firebase/errors.ts
 * PURPOSE: Custom error classes for handling Firestore permission issues.
 * =================================================================================================
 */

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

interface FirebaseAuthToken {
  name: string | null;
  email: string | null;
  email_verified: boolean;
  phone_number: string | null;
  sub: string;
  firebase: {
    identities: Record<string, string[]>;
    sign_in_provider: string;
    tenant: string | null;
  };
}

interface FirebaseAuthObject {
  uid: string;
  token: FirebaseAuthToken;
}

interface SecurityRuleRequest {
  auth: FirebaseAuthObject | null;
  method: string;
  path: string;
  resource?: {
    data: any;
  };
}

function buildAuthObject(currentUser: User | null): FirebaseAuthObject | null {
  if (!currentUser) return null;
  const token: FirebaseAuthToken = {
    name: currentUser.displayName,
    email: currentUser.email,
    email_verified: currentUser.emailVerified,
    phone_number: currentUser.phoneNumber,
    sub: currentUser.uid,
    firebase: {
      identities: currentUser.providerData.reduce((acc, p) => {
        if (p.providerId) acc[p.providerId] = [p.uid];
        return acc;
      }, {} as Record<string, string[]>),
      sign_in_provider: currentUser.providerData[0]?.providerId || 'custom',
      tenant: currentUser.tenantId,
    },
  };
  return { uid: currentUser.uid, token: token };
}

function buildRequestObject(context: SecurityRuleContext): SecurityRuleRequest {
  let authObject: FirebaseAuthObject | null = null;
  try {
    const firebaseAuth = useAuth(); // Assuming useAuth is available in this scope
    const currentUser = firebaseAuth?.currentUser;
    if (currentUser) {
      authObject = buildAuthObject(currentUser);
    }
  } catch {}

  return {
    auth: authObject,
    method: context.operation,
    path: `/databases/(default)/documents/${context.path}`,
    resource: context.requestResourceData ? { data: context.requestResourceData } : undefined,
  };
}

function buildErrorMessage(requestObject: SecurityRuleRequest): string {
  return `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:
${JSON.stringify(requestObject, null, 2)}`;
}

export class FirestorePermissionError extends Error {
  public readonly request: SecurityRuleRequest;

  constructor(context: SecurityRuleContext) {
    const requestObject = buildRequestObject(context);
    super(buildErrorMessage(requestObject));
    this.name = 'FirestorePermissionError';
    this.request = requestObject;
  }
}

/**
 * =================================================================================================
 * FILE: src/firebase/error-emitter.ts
 * PURPOSE: A simple event emitter for global error handling.
 * =================================================================================================
 */

type Events = {
  'permission-error': (error: FirestorePermissionError) => void;
};
type EventName = keyof Events;

class TypedEventEmitter {
  private listeners: { [K in EventName]?: ((...args: Parameters<Events[K]>) => void)[] } = {};

  on<E extends EventName>(event: E, callback: Events[E]): void {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]!.push(callback as any);
  }

  off<E extends EventName>(event: E, callback: Events[E]): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event]!.filter(l => l !== (callback as any));
  }

  emit<E extends EventName>(event: E, ...args: Parameters<Events[E]>): void {
    if (!this.listeners[event]) return;
    this.listeners[event]!.forEach(listener => listener(...args));
  }
}
export const errorEmitter = new TypedEventEmitter();


/**
 * =================================================================================================
 * FILE: src/components/FirebaseErrorListener.tsx
 * PURPOSE: An invisible component that listens for and throws permission errors.
 * =================================================================================================
 */

export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      setError(error);
    };
    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  if (error) {
    throw error;
  }

  return null;
}

/**
 * =================================================================================================
 * FILE: src/firebase/firestore/use-document.tsx
 * PURPOSE: A hook to subscribe to a single Firestore document.
 * =================================================================================================
 */
export type WithId<T> = T & { id: string };

export interface UseDocumentResult<T> {
  data: WithId<T> | null;
  isLoading: boolean;
  error: FirestoreError | Error | null;
}

export function useDocument<T = any>(
  memoizedDocRef: (DocumentReference<DocumentData> & { __memo?: boolean }) | null
): UseDocumentResult<T> {
  const [data, setData] = useState<WithId<T> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!memoizedDocRef || !firestore) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    const unsubscribe = onSnapshot(
      memoizedDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setData({ ...(docSnapshot.data() as T), id: docSnapshot.id });
        } else {
          setData(null);
        }
        setError(null);
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        const contextualError = new FirestorePermissionError({
          path: memoizedDocRef.path,
          operation: 'get',
        });
        setError(contextualError);
        setData(null);
        setIsLoading(false);
        errorEmitter.emit('permission-error', contextualError);
      }
    );
    return () => unsubscribe();
  }, [memoizedDocRef, firestore]);

  if (memoizedDocRef && !memoizedDocRef.__memo) {
    throw new Error('useDocument reference must be memoized with useMemoFirebase');
  }
  return { data, isLoading, error };
}


/**
 * =================================================================================================
 * FILE: src/firebase/firestore/use-collection.tsx
 * PURPOSE: A hook to subscribe to a Firestore collection or query.
 * =================================================================================================
 */

export interface UseCollectionResult<T> {
  data: WithId<T>[] | null;
  isLoading: boolean;
  error: FirestoreError | Error | null;
}

export interface InternalQuery extends Query<DocumentData> {
  _query: {
    path: {
      canonicalString(): string;
      toString(): string;
    }
  }
}

export function useCollection<T = any>(
    memoizedTargetRefOrQuery: ((CollectionReference<DocumentData> | Query<DocumentData>) & {__memo?: boolean})  | null | undefined,
): UseCollectionResult<T> {
  const [data, setData] = useState<WithId<T>[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    if (!memoizedTargetRefOrQuery) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      memoizedTargetRefOrQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const results: WithId<T>[] = snapshot.docs.map(doc => ({ ...(doc.data() as T), id: doc.id }));
        setData(results);
        setError(null);
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        const path: string =
          memoizedTargetRefOrQuery.type === 'collection'
            ? (memoizedTargetRefOrQuery as CollectionReference).path
            : (memoizedTargetRefOrQuery as unknown as InternalQuery)._query.path.canonicalString();

        const contextualError = new FirestorePermissionError({ operation: 'list', path });
        setError(contextualError);
        setData(null);
        setIsLoading(false);
        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [memoizedTargetRefOrQuery]);

  if(memoizedTargetRefOrQuery && !memoizedTargetRefOrQuery.__memo) {
    throw new Error('useCollection query/reference must be memoized with useMemoFirebase');
  }

  return { data, isLoading, error };
}

// This is a placeholder component to make this a valid TSX file.
// The actual content is the collection of functions above for review.
export default function FirebaseCoreReview() {
    return (
        <div>
            <h1>Firebase Core Logic for Review</h1>
            <p>This file contains the consolidated core Firebase interaction logic.</p>
        </div>
    );
}
