'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { getAnimalSoundFlow } from '@/ai/flows/animal-sound-flow';
import { Loader, Volume2, Sparkles } from 'lucide-react';
import placeholderData from '@/lib/placeholder-images.json';
import AnimalSoundCard from '@/components/kids-corner/AnimalSoundCard';

// --- Main Page Component (Home) ---
export default function Home() {
  const animalImages = placeholderData.placeholderImages.filter((img) =>
    img.id.startsWith('animal-')
  );

  return (
    <main
      dir="rtl"
      className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-nile-dark text-white"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold royal-title flex items-center justify-center gap-4">
          <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-gold-accent" />
          ركن الصغار
          <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-gold-accent" />
        </h1>
        <p className="mt-4 text-lg md:text-xl text-sand-ochre">
          استكشفوا أصوات الحيوانات الممتعة! اضغطوا على أي حيوان لسماع صوته.
        </p>
      </div>

      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {animalImages.map((animal) => (
            <AnimalSoundCard
              key={animal.id}
              animalName={animal.metadata?.name || 'حيوان'}
              imageUrl={animal.imageUrl}
              imageHint={animal.imageHint}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
