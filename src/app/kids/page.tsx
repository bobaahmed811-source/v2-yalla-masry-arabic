
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BookHeart, Brush, Rabbit, Search, Sparkles } from 'lucide-react';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

const ActivityCard = ({
  title,
  description,
  icon: Icon,
  color,
  href,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  href: string;
}) => (
  <Link href={href} passHref>
    <Card className="kids-card flex flex-col items-center justify-center p-6 text-center h-full">
      <CardContent className="p-0 flex flex-col items-center">
        <Icon style={{ color }} className="kids-card-icon" />
        <h3 className="text-xl font-bold text-white mb-2 font-cairo">{title}</h3>
        <p className="text-sand-ochre/80 text-sm">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

export default function KidsPage() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="min-h-screen kids-bg flex justify-center items-center text-white" style={{ direction: 'rtl' }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold-accent animate-spin mx-auto" />
          <p className="text-xl text-sand-ochre mt-4 font-cairo">
            جاري تجهيز مملكة الصغار...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen kids-bg p-4 md:p-8" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
            <h1 className="text-4xl md:text-5xl kids-title flex items-center gap-3">
                <Sparkles className="w-10 h-10 text-yellow-300" />
                مملكة الصغار
            </h1>
            <Button asChild variant="outline" className="utility-button">
                <Link href="/">
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    العودة للديوان
                </Link>
            </Button>
        </header>

        <main>
          <p className="text-center text-lg md:text-xl text-sand-ochre mb-12 max-w-3xl mx-auto">
            أهلاً بكم يا أمراء وأميرات في ركنكم الخاص! هنا في مملكة الصغار، التعلم مغامرة ممتعة مليئة بالألعاب والقصص والألوان. هل أنتم مستعدون للإنطلاق؟
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <ActivityCard
              title="ألوان الفراعنة"
              description="لعبة تلوين ممتعة لشخصيات وآثار من مصر القديمة."
              icon={Brush}
              color="#34D399"
              href="/kids/coloring"
            />
            <ActivityCard
              title="أصوات الحيوانات"
              description="استمعوا لأصوات الحيوانات وتعلموا أسمائها بالمصري."
              icon={Rabbit}
              color="#F472B6"
              href="/kids/animal-sounds"
            />
            <ActivityCard
              title="قصص الأنبياء"
              description="قصص مصورة ومروية عن الأنبياء بأسلوب شيق."
              icon={BookHeart}
              color="#60A5FA"
              href="/kids/prophet-stories"
            />
            <ActivityCard
              title="اكتشف الأثر"
              description="لعبة ذاكرة ممتعة مع كنوز الملك توت عنخ آمون."
              icon={Search}
              color="#FBBF24"
              href="/kids/artifact-match"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
