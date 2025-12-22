
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { UserPlus, BookUser, Shield, Parent } from 'lucide-react';
import { useToast } from 'hooks/use-toast';

type UserRole = 'student' | 'teacher' | 'parent';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement Firebase signup logic with the selected role
    console.log('Signing up with:', { name, email, password, role });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example of success handling
    toast({
        title: "تم إنشاء الحساب بنجاح",
        description: `أهلاً بك يا ${name}! لنبدأ رحلتك كـ ${role === 'student' ? 'طالب' : role === 'teacher' ? 'معلم' : 'ولي أمر'}.`,
    });
    
    // Redirect based on role
    if (role === 'student') {
        router.push('/onboarding');
    } else {
        router.push('/profile'); // Redirect teachers/parents to their profile for now
    }
  };

  return (
    <main dir="rtl" className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-nile-dark text-white">
      <Card className="w-full max-w-lg bg-nile-blue border-sand-ochre shadow-lg shadow-gold-accent/20">
        <CardHeader className="text-center">
          <CardTitle className="text-sand-ochre text-3xl royal-title flex items-center justify-center gap-3">
            <UserPlus className="w-8 h-8" />
            إنشاء حساب جديد
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg pt-2">
            انضم إلى الأكاديمية وابدأ رحلتك التعليمية.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-sand-ochre">الاسم الكامل</Label>
                <Input id="name" type="text" placeholder="مثال: أحمد المصري" value={name} onChange={(e) => setName(e.target.value)} required className="bg-nile-dark/50 border-sand-ochre/50 text-white focus:border-gold-accent"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sand-ochre">البريد الإلكتروني</Label>
              <Input id="email" type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-nile-dark/50 border-sand-ochre/50 text-white focus:border-gold-accent"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password"  className="text-sand-ochre">كلمة المرور</Label>
              <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="bg-nile-dark/50 border-sand-ochre/50 text-white focus:border-gold-accent"/>
            </div>

            <div className="space-y-3">
                 <Label className="text-sand-ochre">أنا أسجل بصفتي:</Label>
                 <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="grid grid-cols-3 gap-4">
                    <div>
                        <RadioGroupItem value="student" id="student" className="sr-only" />
                        <Label htmlFor="student" className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${role === 'student' ? 'border-gold-accent bg-gold-accent/10' : 'border-sand-ochre/50 hover:border-sand-ochre'}`}>
                           <BookUser className="w-6 h-6 mb-1"/>
                           <span className="text-sm font-bold">طالب</span>
                        </Label>
                    </div>
                     <div>
                        <RadioGroupItem value="teacher" id="teacher" className="sr-only" />
                        <Label htmlFor="teacher" className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${role === 'teacher' ? 'border-gold-accent bg-gold-accent/10' : 'border-sand-ochre/50 hover:border-sand-ochre'}`}>
                           <Shield className="w-6 h-6 mb-1"/>
                           <span className="text-sm font-bold">معلم</span>
                        </Label>
                    </div>
                     <div>
                        <RadioGroupItem value="parent" id="parent" className="sr-only" />
                        <Label htmlFor="parent" className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${role === 'parent' ? 'border-gold-accent bg-gold-accent/10' : 'border-sand-ochre/50 hover:border-sand-ochre'}`}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mb-1"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v10l-4-4H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2"/></svg>
                           <span className="text-sm font-bold">ولي أمر</span>
                        </Label>
                    </div>
                 </RadioGroup>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-gold-accent text-nile-dark font-bold hover:bg-sand-ochre">
              {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
            </Button>
          </form>
           <div className="mt-6 text-center">
                <p className="text-gray-300">
                    لديك حساب بالفعل؟{' '}
                    <Link href="/login" className="text-sand-ochre hover:text-gold-accent font-semibold">
                        سجل الدخول من هنا
                    </Link>
                </p>
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
