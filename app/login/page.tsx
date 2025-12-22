
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { LogIn } from 'lucide-react';
import { useToast } from 'hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement Firebase login logic
    console.log('Logging in with:', { email, password });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example of error handling
    const loginFailed = Math.random() > 0.5; // Simulate success/failure
    if (loginFailed) {
        toast({
            title: "فشل تسجيل الدخول",
            description: "البريد الإلكتروني أو كلمة المرور غير صحيحة. الرجاء المحاولة مرة أخرى.",
            variant: "destructive",
        });
        setIsLoading(false);
    } else {
        toast({
            title: "تم تسجيل الدخول بنجاح",
            description: "أهلاً بعودتك!",
        });
        // Redirect to a dashboard or home page after successful login
        router.push('/onboarding');
    }
  };

  return (
    <main dir="rtl" className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-nile-dark text-white">
      <Card className="w-full max-w-md bg-nile-blue border-sand-ochre shadow-lg shadow-gold-accent/20">
        <CardHeader className="text-center">
          <CardTitle className="text-sand-ochre text-3xl royal-title flex items-center justify-center gap-3">
            <LogIn className="w-8 h-8" />
            تسجيل الدخول
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg pt-2">
            أهلاً بعودتك إلى أكاديمية يلا مصري.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sand-ochre">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-nile-dark/50 border-sand-ochre/50 text-white focus:border-gold-accent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password"  className="text-sand-ochre">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-nile-dark/50 border-sand-ochre/50 text-white focus:border-gold-accent"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-gold-accent text-nile-dark font-bold hover:bg-sand-ochre">
              {isLoading ? 'جاري التحقق...' : 'دخول'}
            </Button>
          </form>
           <div className="mt-6 text-center">
                <p className="text-gray-300">
                    ليس لديك حساب؟{' '}
                    <Link href="/signup" className="text-sand-ochre hover:text-gold-accent font-semibold">
                        أنشئ حسابًا جديدًا
                    </Link>
                </p>
            </div>
        </CardContent>
      </Card>
    </main>
  );
}
