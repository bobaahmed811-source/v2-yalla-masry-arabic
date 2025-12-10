
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Map, CheckCircle, ArrowLeft, Lock } from 'lucide-react';

// Mock data - in the future, this will come from Firestore
const learningPath = {
  levels: [
    {
      title: 'المستوى الأول: تلميذ النيل',
      description: 'أساسيات اللهجة المصرية للمبتدئين.',
      modules: [
        { id: '1-1', title: 'الوحدة 1: التحيات والتعارف', status: 'completed' },
        { id: '1-2', title: 'الوحدة 2: في السوق', status: 'current' },
        { id: '1-3', title: 'الوحدة 3: عائلتي وأصدقائي', status: 'locked' },
        { id: '1-4', title: 'الوحدة 4: طلب الطعام', status: 'locked' },
      ],
    },
    {
      title: 'المستوى الثاني: كاتب البردي',
      description: 'بناء الجمل والمحادثات المتقدمة.',
      modules: [
         { id: '2-1', title: 'الوحدة 5: الحديث عن العمل', status: 'locked' },
         { id: '2-2', title: 'الوحدة 6: السفر والمواصلات', status: 'locked' },
      ]
    },
    {
      title: 'المستوى الثالث: الفرعون القوي',
      description: 'إتقان التعبيرات المعقدة والنقاشات العميقة.',
      modules: [
         { id: '3-1', title: 'الوحدة 7: الأمثال الشعبية', status: 'locked' },
         { id: '3-2', title: 'الوحدة 8: الثقافة والإعلام', status: 'locked' },
      ]
    },
  ],
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="text-green-400" />;
    case 'current':
      return <ArrowLeft className="text-yellow-400 animate-pulse" />;
    case 'locked':
      return <Lock className="text-gray-500" />;
    default:
      return null;
  }
};

export default function LearningPathPage() {
  return (
    <div
      className="min-h-screen bg-nile-dark text-white p-4 md:p-8"
      style={{ direction: 'rtl' }}
    >
      <header className="text-center mb-12">
        <div className="inline-block p-4 bg-nile rounded-full shadow-lg mb-4 border-2 border-gold-accent">
          <Map className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2 royal-title">
          مسار التعلم الملكي
        </h1>
        <p className="text-xl text-sand-ochre">
          رحلتك خطوة بخطوة من تلميذ إلى فرعون في اللهجة المصرية.
        </p>
      </header>

      <main className="max-w-4xl mx-auto w-full">
        <div className="space-y-12">
          {learningPath.levels.map((level, levelIndex) => (
            <div key={levelIndex} className="dashboard-card p-6 rounded-2xl">
              <h2 className="text-3xl royal-title text-gold-accent mb-2 border-b-2 border-sand-ochre/20 pb-3">
                {level.title}
              </h2>
              <p className="text-sand-ochre mb-6">{level.description}</p>
              <div className="space-y-4">
                {level.modules.map((module) => (
                  <Link 
                    key={module.id}
                    href={module.status !== 'locked' ? `/learning-path/${module.id}` : '#'}
                    passHref
                    className={`block ${module.status === 'locked' ? 'pointer-events-none' : ''}`}
                  >
                    <div
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                        module.status === 'locked'
                          ? 'bg-nile/50 cursor-not-allowed opacity-60'
                          : 'bg-nile hover:bg-sand-ochre/20 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl w-8 text-center">
                          {getStatusIcon(module.status)}
                        </div>
                        <span className="font-bold text-lg">{module.title}</span>
                      </div>
                      {module.status !== 'locked' && (
                        <Button asChild className="cta-button text-sm px-5 py-2">
                           <a>{module.status === 'current' ? 'ابدأ الدرس' : 'مراجعة'}</a>
                        </Button>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-auto pt-12 text-center text-gray-400 text-sm">
        <Link
          href="/"
          className="utility-button px-6 py-2 text-md font-bold rounded-lg flex items-center justify-center mx-auto w-fit"
        >
          <ArrowRight className="ml-2 h-4 w-4" />
          <span>العودة للوحة التحكم</span>
        </Link>
        <p className="mt-4">أكاديمية يلا مصري © 2024</p>
      </footer>
    </div>
  );
}
