
import React from 'react';
import AnimalSoundCard from 'components/kids-corner/AnimalSoundCard';
import placeholderImages from 'lib/placeholder-images.json';
import { PawPrint } from 'lucide-react';

export default function KidsCornerPage() {
  const animalImages = placeholderImages.placeholderImages.filter(p => p.id.startsWith('animal-'));

  return (
    <main dir="rtl" className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-nile-dark text-white">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold royal-title flex items-center justify-center gap-4">
            <PawPrint className="w-8 h-8 md:w-12 md:h-12 text-gold-accent" />
            ركن الصغار
          </h1>
          <p className="mt-4 text-lg md:text-xl text-sand-ochre">
            اضغط على صورة الحيوان لتسمع صوته!
          </p>
        </div>

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
