
import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookMarked, ChevronRight } from 'lucide-react';
import quranData from '@/lib/quran-data.json';

// Helper function to find Surah data by ID
function getSurahById(id: number) {
  return quranData.surahs.find((s) => s.id === id);
}

// Params will be passed by Next.js for dynamic routes
export default function SurahDetailPage({ params }: { params: { surahId: string } }) {
  const surahId = parseInt(params.surahId, 10);
  const surah = getSurahById(surahId);

  // Handle case where surah is not found
  if (!surah) {
    return (
      <main dir="rtl" className="flex min-h-screen flex-col items-center justify-center p-8 bg-nile-dark text-white">
        <h1 className="text-2xl royal-title">السورة غير موجودة</h1>
        <Link href="/quran">
            <Button variant="link" className="text-sand-ochre">العودة إلى الفهرس</Button>
        </Link>
      </main>
    );
  }

  const nextSurahId = surah.id < 114 ? surah.id + 1 : null;
  const prevSurahId = surah.id > 1 ? surah.id - 1 : null;

  return (
    <main dir="rtl" className="flex min-h-screen flex-col items-center p-4 sm:p-8 bg-nile-dark text-white">
      <div className="w-full max-w-4xl">
        <Card className="bg-nile-blue border-sand-ochre shadow-lg shadow-gold-accent/20">
          <CardHeader className="text-center border-b border-sand-ochre/30 pb-4">
            <CardDescription className="text-sand-ochre text-lg">
              سورة {surah.name}
            </CardDescription>
            <CardTitle className="text-white text-4xl md:text-5xl" style={{ fontFamily: "'Amiri Quran', serif" }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 text-justify">
            <div className="space-y-4 leading-loose" style={{ fontFamily: "'Amiri Quran', serif", fontSize: '1.5rem' }}>
              {/* Placeholder for Ayahs - In a real app, this would be fetched from an API */}
              <p>
                <span className="text-gold-accent font-bold">(1)</span> الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ{' '}
                <span className="text-gold-accent font-bold">(2)</span> الرَّحْمَٰنِ الرَّحِيمِ{' '}
                <span className="text-gold-accent font-bold">(3)</span> مَالِكِ يَوْمِ الدِّينِ{' '}
                <span className="text-gold-accent font-bold">(4)</span> إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ{' '}
                <span className="text-gold-accent font-bold">(5)</span> اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ{' '}
                <span className="text-gold-accent font-bold">(6)</span> صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ{' '}
                <span className="text-gold-accent font-bold">(7)</span>
              </p>
              <p className="text-center text-sand-ochre text-base pt-4">(هذه آيات سورة الفاتحة كمثال. سيتم عرض آيات السورة المختارة هنا)</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-sand-ochre/30 pt-4">
             {prevSurahId ? (
                <Link href={`/quran/${prevSurahId}`}>
                    <Button variant="outline" className="border-sand-ochre text-sand-ochre hover:bg-sand-ochre hover:text-nile-dark">
                        السورة السابقة
                    </Button>
                </Link>
             ) : <div></div>}
             <Link href="/quran">
                <Button variant="ghost" className="text-sand-ochre hover:text-gold-accent">
                    <BookMarked className="w-5 h-5 ml-2"/>
                    العودة للفهرس
                </Button>
            </Link>
             {nextSurahId ? (
                <Link href={`/quran/${nextSurahId}`}>
                    <Button variant="outline" className="border-sand-ochre text-sand-ochre hover:bg-sand-ochre hover:text-nile-dark">
                        السورة التالية
                    </Button>
                </Link>
             ) : <div></div>}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
    return quranData.surahs.map((surah) => ({
      surahId: surah.id.toString(),
    }));
}
