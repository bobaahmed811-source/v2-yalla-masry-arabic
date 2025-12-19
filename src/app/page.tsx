'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// A simple root page that automatically redirects to the /kids section.
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the kids page immediately on component mount.
    router.replace('/kids');
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-kids-bg text-white p-8 flex flex-col items-center justify-center text-center">
      <div className="animate-pulse">
        <h1 className="text-4xl font-bold text-white font-cairo mb-4">
          أهلاً بكم في مملكة يلى مصري
        </h1>
        <p className="text-lg text-sand-ochre mb-8">
          جاري تحويلك إلى ركن الصغار...
        </p>
        <Link href="/kids" passHref>
          <span className="cta-button rounded-lg px-8 py-3 text-lg font-bold">
              اضغط هنا إذا لم يتم تحويلك
          </span>
        </Link>
      </div>
    </div>
  );
}
