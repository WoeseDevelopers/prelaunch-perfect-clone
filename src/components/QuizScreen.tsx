import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { questions, answerOptions } from "@/data/quizQuestions";
import { cn } from "@/lib/utils";

interface QuizScreenProps {
  onComplete: (answers: Record<number, number>) => void;
  onBack: () => void;
}

const QuizScreen = ({ onComplete, onBack }: QuizScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const selectedValue = answers[question.id];

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete(newAnswers);
      }
    }, 300);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="space-y-3 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
            <span className="text-sm font-medium text-muted-foreground">
              {currentIndex + 1} de {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-secondary" />
        </div>

        {/* Question Card */}
        <Card key={question.id} className="animate-fade-in-up rounded-2xl border border-border/50 shadow-lg">
          <CardContent className="p-8 space-y-6">
            <p className="text-lg font-medium leading-relaxed text-foreground">
              {question.text}
            </p>

            <div className="space-y-3">
              {answerOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={cn(
                    "w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all hover:scale-[1.02]",
                    selectedValue === option.value
                      ? "border-[hsl(var(--trampos-purple))] bg-[hsl(var(--trampos-purple))]/10 text-[hsl(var(--trampos-purple))]"
                      : "border-border/50 bg-card hover:border-[hsl(var(--trampos-purple))]/30 text-foreground/80"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizScreen;
