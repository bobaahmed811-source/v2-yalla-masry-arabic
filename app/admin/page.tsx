
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function AdminPage() {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-nile-dark text-white"
    >
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold royal-title flex items-center justify-center gap-4">
            <Shield className="w-8 h-8 md:w-12 md:h-12 text-gold-accent" />
            لوحة التحكم
          </h1>
          <p className="mt-4 text-lg md:text-xl text-sand-ochre">
            إدارة محتوى وبيانات الأكاديمية.
          </p>
        </div>

        <Card className="bg-nile-blue border-sand-ochre">
          <CardHeader>
            <CardTitle className="text-sand-ochre text-2xl">المستخدمون (مثال)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-sand-ochre">
                  <TableHead className="text-right text-gold-accent">الاسم</TableHead>
                  <TableHead className="text-right text-gold-accent">البريد الإلكتروني</TableHead>
                  <TableHead className="text-right text-gold-accent">تاريخ الانضمام</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-sand-ochre/50">
                  <TableCell>أحمد المصري</TableCell>
                  <TableCell>ahmed@example.com</TableCell>
                  <TableCell>2024-05-20</TableCell>
                </TableRow>
                <TableRow className="border-sand-ochre/50">
                  <TableCell>فاطمة الزهراء</TableCell>
                  <TableCell>fatima@example.com</TableCell>
                  <TableCell>2024-05-19</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
