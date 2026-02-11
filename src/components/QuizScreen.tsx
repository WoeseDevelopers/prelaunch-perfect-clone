import { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { questions, antagonisms, type RiasecType } from "@/data/quizQuestions";
import { cn } from "@/lib/utils";

// Answer stores which RIASEC type got the point
interface QuizScreenProps {
  onComplete: (answers: Record<number, 'yes' | 'no'>) => void;
  onBack: () => void;
}

const QuizScreen = ({ onComplete, onBack }: QuizScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no'>>({});

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const selectedValue = answers[question.id];

  const handleAnswer = (value: 'yes' | 'no') => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

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
    <div className="min-h-screen px-4 py-4">
      <div className="w-full max-w-lg mx-auto">
        {/* Header with back + counter */}
        <div className="flex items-center justify-between mb-2 animate-fade-in-up">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <Progress value={progress} className="h-2 bg-secondary mb-0" />

        {/* Question area - centered vertically */}
        <div
          key={question.id}
          className="flex flex-col items-center justify-center pt-24 pb-8 animate-fade-in-up"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--trampos-purple))] mb-4">
            Pergunta
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center leading-tight text-foreground mb-10">
            {question.text}
          </h2>

          {/* SIM / NÃO buttons */}
          <div className="w-full flex gap-4">
            <button
              onClick={() => handleAnswer('yes')}
              className={cn(
                "flex-1 flex flex-col items-center gap-2 rounded-2xl border px-5 py-6 transition-all hover:scale-[1.02]",
                selectedValue === 'yes'
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-border bg-card hover:border-emerald-500/50"
              )}
            >
              <Check className={cn("h-8 w-8", selectedValue === 'yes' ? "text-emerald-500" : "text-muted-foreground")} />
              <span className={cn("text-lg font-bold", selectedValue === 'yes' ? "text-emerald-500" : "text-foreground")}>
                SIM
              </span>
            </button>
            <button
              onClick={() => handleAnswer('no')}
              className={cn(
                "flex-1 flex flex-col items-center gap-2 rounded-2xl border px-5 py-6 transition-all hover:scale-[1.02]",
                selectedValue === 'no'
                  ? "border-red-400 bg-red-400/10"
                  : "border-border bg-card hover:border-red-400/50"
              )}
            >
              <X className={cn("h-8 w-8", selectedValue === 'no' ? "text-red-400" : "text-muted-foreground")} />
              <span className={cn("text-lg font-bold", selectedValue === 'no' ? "text-red-400" : "text-foreground")}>
                NÃO
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
