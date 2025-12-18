'use client';

import React from 'react';
import Link from 'next/link';

// A very simple root page to ensure it loads and redirects.
export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-kids-bg text-white p-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-white font-cairo mb-4">
        أهلاً بكم في مملكة يلى مصري
      </h1>
      <p className="text-lg text-sand-ochre mb-8">
        جاري تحويلك إلى مملكة الصغار...
      </p>
      <Link href="/kids" passHref>
        <span className="cta-button rounded-lg px-8 py-3 text-lg font-bold">
            اضغط هنا إذا لم يتم تحويلك
        </span>
      </Link>
    </div>
  );
}
