
'use client';

import React from 'react';
import Link from 'next/link';
import AnimalSoundPage from './kids-corner/page';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <div className="absolute top-4 left-4 z-10">
        <Link href="/admin">
          <Button variant="outline" className="bg-sand-ochre text-nile-dark hover:bg-gold-accent">
            لوحة التحكم
          </Button>
        </Link>
      </div>
      <AnimalSoundPage />
    </div>
  );
}
