
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, BookOpen } from 'lucide-react';
import challenges from '@/lib/adventure-challenges.json';
import placeholderImages from '@/lib/placeholder-images.json';

// Find the character image for Nouf
const noufImage = placeholderImages.placeholderImages.find(p => p.id === 'nouf-character');

export default function AdventureChallengePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentChallenge = challenges.challenges[currentIndex];
  const challengeImage = placeholderImages.placeholderImages.find(p => p.id === currentChallenge.imageId);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleNextChallenge = () => {
    setIsRevealed(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % challenges.challenges.length);
  };

  return (
    <main dir="rtl" className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-nile-dark text-white">
      <Card className="w-full max-w-3xl bg-nile-blue border-sand-ochre shadow-lg shadow-gold-accent/20">
        <CardHeader className="text-center">
          <CardTitle className="text-sand-ochre text-3xl royal-title flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8" />
            رحلة نوف: تحدي اللهجات
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg pt-2">{currentChallenge.category}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Gulf Phrase Section */}
          <div className="flex items-start gap-4">
            {noufImage && (
              <Image
                src={noufImage.imageUrl}
                alt="Nouf Character"
                width={80}
                height={80}
                className="rounded-full border-2 border-gold-accent"
                data-ai-hint={noufImage.imageHint}
              />
            )}
            <div className="relative flex-1 rounded-lg bg-nile-dark/50 p-4 border border-sand-ochre/50">
              <p className="text-sm text-sand-ochre mb-1">نوف تقول (باللهجة الخليجية):</p>
              <p className="text-xl md:text-2xl font-semibold text-white">"{currentChallenge.gulf_phrase}"</p>
              <div className="absolute top-[-10px] right-12 w-0 h-0 border-l-[10px] border-l-transparent border-b-[15px] border-b-sand-ochre/50 border-r-[10px] border-r-transparent"></div>
            </div>
          </div>

          {/* Egyptian Phrase Section (Revealed) */}
          {isRevealed && challengeImage && (
            <div className="flex items-start gap-4 animate-fade-in-up">
              <Image
                src={challengeImage.imageUrl}
                alt={currentChallenge.category}
                width={80}
                height={80}
                className="rounded-full border-2 border-gold-accent object-cover"
                data-ai-hint={challengeImage.imageHint}
              />
              <div className="relative flex-1 rounded-lg bg-sand-ochre/10 p-4 border border-gold-accent">
                <p className="text-sm text-gold-accent mb-1">في مصر نقول:</p>
                <p className="text-xl md:text-2xl font-bold text-sand-ochre">"{currentChallenge.egyptian_phrase}"</p>
                {currentChallenge.explanation && (
                  <div className="mt-3 pt-3 border-t border-sand-ochre/30 flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-gold-accent flex-shrink-0 mt-1" />
                    <p className="text-gray-300">{currentChallenge.explanation}</p>
                  </div>
                )}
                <div className="absolute top-[-10px] right-12 w-0 h-0 border-l-[10px] border-l-transparent border-b-[15px] border-b-gold-accent border-r-[10px] border-r-transparent"></div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center pt-4">
            {!isRevealed ? (
              <Button onClick={handleReveal} size="lg" className="bg-sand-ochre text-nile-dark hover:bg-gold-accent">
                اكتشف باللهجة المصرية
              </Button>
            ) : (
              <Button onClick={handleNextChallenge} size="lg" className="bg-gold-accent text-nile-dark hover:bg-sand-ochre">
                التحدي التالي
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
