'use client';

import React from 'react';
import Link from 'next/link';

// A simple root page that directs the user to the /kids section.
export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-kids-bg text-white p-8 flex flex-col items-center justify-center text-center">
      <div>
        <h1 className="text-4xl font-bold text-white font-cairo mb-4">
          أهلاً بكم في مملكة يلى مصري
        </h1>
        <p className="text-lg text-sand-ochre mb-8">
          المغامرة تبدأ من هنا. هيا بنا إلى ركن الصغار!
        </p>
        <Link href="/kids" passHref>
          <span className="cta-button rounded-lg px-8 py-3 text-lg font-bold animate-pulse">
              اضغط هنا للبدء
          </span>
        </Link>
      </div>
    </div>
  );
}
