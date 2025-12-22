
import React from 'react';
import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BookMarked, ArrowLeft } from 'lucide-react';
import quranData from '@/lib/quran-data.json';

export default function QuranIndexPage() {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-nile-dark text-white"
    >
      <div className="w-full max-w-4xl">
        <Card className="bg-nile-blue border-sand-ochre shadow-lg shadow-gold-accent/20">
          <CardHeader className="text-center">
            <CardTitle className="text-sand-ochre text-3xl md:text-4xl royal-title flex items-center justify-center gap-4">
              <BookMarked className="w-8 h-8 md:w-10 md:h-10 text-gold-accent" />
              القرآن الكريم
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg pt-2">
              فهرس السور
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-sand-ochre/50 hover:bg-nile-dark/30">
                  <TableHead className="text-right text-gold-accent font-bold">الرقم</TableHead>
                  <TableHead className="text-right text-gold-accent font-bold">اسم السورة</TableHead>
                  <TableHead className="text-right text-gold-accent font-bold hidden sm:table-cell">نوع النزول</TableHead>
                  <TableHead className="text-right text-gold-accent font-bold hidden sm:table-cell">عدد الآيات</TableHead>
                  <TableHead className="text-left text-gold-accent font-bold"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quranData.surahs.map((surah) => (
                  <TableRow key={surah.id} className="border-sand-ochre/30 hover:bg-nile-dark/50">
                    <TableCell className="font-medium text-sand-ochre">{surah.id}</TableCell>
                    <TableCell className="font-semibold text-lg text-white">{surah.name}</TableCell>
                    <TableCell className="text-gray-300 hidden sm:table-cell">{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</TableCell>
                    <TableCell className="text-gray-300 hidden sm:table-cell">{surah.numberOfAyahs}</TableCell>
                    <TableCell className="text-left">
                      <Link href={`/quran/${surah.id}`} className="flex items-center justify-end gap-2 text-sand-ochre hover:text-gold-accent transition-colors">
                        <span className='hidden md:inline'>عرض</span>
                        <ArrowLeft className="w-5 h-5" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
