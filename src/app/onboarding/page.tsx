
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Globe, Briefcase, MessageSquare, GraduationCap, BarChart, Activity, ChevronRight, ChevronLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const goals = [
  { id: 'social', label: 'التواصل الاجتماعي', description: 'للتحدث مع الأصدقاء والعائلة.', icon: MessageSquare },
  { id: 'business', label: 'العمل والأعمال', description: 'للتواصل في بيئة العمل.', icon: Briefcase },
  { id: 'tourism', label: 'السياحة والسفر', description: 'للتجول والاستمتاع في مصر.', icon: Globe },
  { id: 'studies', label: 'الدراسة والثقافة', description: 'لفهم أعمق للثقافة والإعلام.', icon: GraduationCap },
];

const levels = [
  { id: 'beginner', label: 'مبتدئ تمامًا', description: 'لا أعرف أي شيء تقريبًا.', icon: BarChart },
  { id: 'intermediate', label: 'أعرف بعض الأساسيات', description: 'أفهم بعض الكلمات والعبارات.', icon: Activity },
  { id: 'advanced', label: 'أستطيع إجراء محادثة', description: 'أبحث عن الطلاقة والدقة.', icon: GraduationCap },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const router = useRouter();

  const progressValue = step === 1 ? 50 : 100;

  const handleNext = () => {
    if (step === 1 && goal) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFinish = () => {
    if (level) {
      // Here you would typically save the user's preferences
      console.log('Goal:', goal, 'Level:', level);
      // For now, just redirect to the home page (which will be the dashboard later)
      router.push('/kids-corner'); // Let's go to kids corner for now
    }
  };

  return (
    <main dir="rtl" className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-nile-dark text-white">
      <Card className="w-full max-w-2xl bg-nile-blue border-sand-ochre shadow-lg shadow-gold-accent/20">
        <CardHeader className="text-center">
          <CardTitle className="text-sand-ochre text-3xl royal-title">
            {step === 1 ? 'لنخصص رحلتك التعليمية' : 'ما هو مستواك الحالي؟'}
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg pt-2">
            {step === 1 ? 'اختر هدفك الأساسي من تعلم اللهجة المصرية.' : 'هذا يساعدنا على اختيار الدروس المناسبة لك.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Progress value={progressValue} className="w-full h-2 bg-nile-dark" />
            <p className="text-center text-sm text-sand-ochre mt-2">خطوة {step} من 2</p>
          </div>

          {step === 1 && (
            <RadioGroup value={goal ?? ''} onValueChange={setGoal} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((g) => (
                <Label key={g.id} htmlFor={g.id} className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${goal === g.id ? 'border-gold-accent bg-gold-accent/10' : 'border-sand-ochre/50 hover:border-sand-ochre'}`}>
                  <RadioGroupItem value={g.id} id={g.id} className="sr-only" />
                  <g.icon className={`h-10 w-10 mb-2 ${goal === g.id ? 'text-gold-accent' : 'text-sand-ochre'}`} />
                  <span className="font-bold text-lg text-white">{g.label}</span>
                  <span className="text-sm text-gray-300">{g.description}</span>
                </Label>
              ))}
            </RadioGroup>
          )}

          {step === 2 && (
            <RadioGroup value={level ?? ''} onValueChange={setLevel} className="grid grid-cols-1 gap-4">
              {levels.map((l) => (
                <Label key={l.id} htmlFor={l.id} className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${level === l.id ? 'border-gold-accent bg-gold-accent/10' : 'border-sand-ochre/50 hover:border-sand-ochre'}`}>
                  <RadioGroupItem value={l.id} id={l.id} className="sr-only" />
                  <l.icon className={`h-8 w-8 ml-4 ${level === l.id ? 'text-gold-accent' : 'text-sand-ochre'}`} />
                  <div>
                    <span className="font-bold text-lg text-white">{l.label}</span>
                    <p className="text-sm text-gray-300">{l.description}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          )}

          <div className="flex justify-between mt-8">
            {step === 2 ? (
              <Button variant="outline" onClick={handleBack} className="border-sand-ochre text-sand-ochre hover:bg-sand-ochre hover:text-nile-dark">
                <ChevronRight className="ml-2 h-4 w-4" />
                رجوع
              </Button>
            ) : (
              <div></div> // Placeholder for alignment
            )}
            
            {step === 1 ? (
              <Button onClick={handleNext} disabled={!goal} className="bg-sand-ochre text-nile-dark hover:bg-gold-accent disabled:opacity-50">
                التالي
                <ChevronLeft className="mr-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleFinish} disabled={!level} className="bg-gold-accent text-nile-dark hover:bg-sand-ochre disabled:opacity-50">
                إنهاء وبدء التعلم
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
