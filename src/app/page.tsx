'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * A simple, robust root page that provides a clear entry point to the application.
 * This avoids any complex logic or redirects that might confuse the Vercel build process.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-kids-bg text-white p-8 flex flex-col items-center justify-center text-center">
      <div className="max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 font-cairo mb-4">
          مملكة يلا مصري
        </h1>
        <p className="text-lg text-sand-ochre mb-8">
          بوابة العبور إلى عالم من المغامرات لتعلم اللهجة المصرية. هيا بنا ننطلق إلى ركن الصغار!
        </p>
        <Link href="/kids" passHref>
          <Button 
            className="cta-button rounded-lg px-8 py-3 text-lg font-bold animate-pulse h-auto"
            aria-label="الانتقال إلى ركن الصغار"
          >
              اضغط هنا للبدء
          </Button>
        </Link>
      </div>
    </div>
  );
}
