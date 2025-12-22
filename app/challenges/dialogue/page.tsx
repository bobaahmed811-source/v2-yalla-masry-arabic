
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { getDialogueEvaluationFlow, DialogueEvaluationInput, DialogueEvaluationOutput } from 'ai/flows/dialogue-evaluation-flow';
import { useToast } from 'hooks/use-toast';

// Define the structure for a dialogue choice
type DialogueChoice = {
  text: string;
  type: DialogueEvaluationInput['choiceType'];
};

// The scenario for the dialogue challenge
const scenario = {
  title: "سيناريو: في السوق",
  situation: "أنتِ في سوق خان الخليلي وتريدين شراء هدية. سألتِ البائع عن سعر قطعة أثرية صغيرة فقال لكِ: 'بـ 150 جنيه يا فندم'. كيف تردين؟",
  choices: [
    { text: "غالي قوي! آخرها كام؟", type: "good" },
    { text: "شكرًا جزيلًا، سعرها مناسب جدًا.", type: "excellent" },
    { text: "ده سرقة!", type: "wrong" },
    { text: "تمام.", type: "correct" },
  ] as DialogueChoice[],
};

export default function DialogueChallengePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<DialogueEvaluationOutput | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<DialogueChoice | null>(null);
  const { toast } = useToast();

  const handleChoiceClick = async (choice: DialogueChoice) => {
    if (isLoading) return;

    setIsLoading(true);
    setSelectedChoice(choice);
    setEvaluation(null);

    try {
      const result = await getDialogueEvaluationFlow({
        userAnswer: choice.text,
        choiceType: choice.type,
      });
      setEvaluation(result);
    } catch (error) {
      console.error("Error evaluating dialogue:", error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من تقييم إجابتك. الرجاء المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEvaluation(null);
    setSelectedChoice(null);
    setIsLoading(false);
  }

  return (
    <main dir="rtl" className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-nile-dark text-white">
      <Card className="w-full max-w-2xl bg-nile-blue border-sand-ochre shadow-lg shadow-gold-accent/20">
        <CardHeader className="text-center">
          <CardTitle className="text-sand-ochre text-3xl royal-title">{scenario.title}</CardTitle>
          <CardDescription className="text-gray-300 text-lg pt-2">{scenario.situation}</CardDescription>
        </CardHeader>
        <CardContent>
          {!evaluation ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenario.choices.map((choice, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className={`p-6 h-auto text-lg whitespace-normal justify-center border-2 text-white border-sand-ochre/50 hover:border-gold-accent hover:bg-gold-accent/10 disabled:opacity-50`}
                  onClick={() => handleChoiceClick(choice)}
                  disabled={isLoading}
                >
                  {isLoading && selectedChoice?.text === choice.text ? <Loader className="animate-spin ml-2" /> : null}
                  {choice.text}
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 rounded-lg bg-nile-dark/50">
              <div className="flex justify-center items-center mb-4">
                {evaluation.isPositive ? (
                  <CheckCircle className="w-16 h-16 text-green-400" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-400" />
                )}
              </div>
              <p className={`text-5xl font-bold mb-2 ${evaluation.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {evaluation.score} نقطة
              </p>
              <p className="text-xl text-sand-ochre mb-6">{evaluation.feedback}</p>
              <Button onClick={handleReset} className="bg-sand-ochre text-nile-dark hover:bg-gold-accent">
                تحدي آخر (مثال)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
