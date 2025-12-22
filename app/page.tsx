
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from 'components/ui/button';
import Image from 'next/image';
import placeholderImages from 'lib/placeholder-images.json';

export default function LandingPage() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'pyramids-hero');

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center text-white text-center overflow-hidden" dir="rtl">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover z-0"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-nile-dark/70 z-10"></div>

      <div className="relative z-20 flex flex-col items-center p-8 max-w-3xl">
        <div className="p-4 rounded-lg bg-black/30 backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl font-bold royal-title mb-4 animate-fade-in-down">
            أهلاً بك في أكاديمية يلا مصري
          </h1>
          <p className="text-lg md:text-2xl text-sand-ochre mb-8 animate-fade-in-up">
            بوابتك لتعلم اللهجة المصرية الأصيلة واستكشاف كنوز الثقافة الفرعونية.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-gold-accent text-nile-dark font-bold text-lg hover:bg-sand-ochre transition-transform duration-300 hover:scale-105 animate-pulse">
                ابدأ رحلتك (حساب جديد)
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-sand-ochre border-sand-ochre font-bold text-lg hover:bg-sand-ochre hover:text-nile-dark transition-transform duration-300 hover:scale-105">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
        <Link href="/admin" className="absolute top-4 right-4">
             <Button variant="outline" className="bg-sand-ochre text-nile-dark hover:bg-gold-accent">
                لوحة التحكم
             </Button>
        </Link>
      </div>
    </div>
  );
}
