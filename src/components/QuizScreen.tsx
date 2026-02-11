import { useState } from "react";
import { ArrowLeft } from "lucide-react";
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
            O quanto você curte...
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center leading-tight text-foreground mb-10">
            {question.text}
          </h2>

          {/* Answer options */}
          <div className="w-full space-y-3">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={cn(
                  "w-full flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all hover:scale-[1.01]",
                  selectedValue === option.value
                    ? "border-[hsl(var(--trampos-purple))] bg-[hsl(var(--trampos-purple))]/5"
                    : "border-border bg-card hover:border-muted-foreground/30"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                    selectedValue === option.value
                      ? "bg-[hsl(var(--trampos-purple))] text-white"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {option.value}
                </span>
                <span className="text-base font-medium text-foreground">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
