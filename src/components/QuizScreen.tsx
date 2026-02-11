import { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { questions, riasecProfiles, antagonisms } from "@/data/quizQuestions";
import { cn } from "@/lib/utils";

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

  // Get profile info for labels
  const primaryProfile = riasecProfiles[question.type];
  const antagonistProfile = riasecProfiles[antagonisms[question.type]];

  const handleAnswer = (value: 'yes' | 'no') => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete(newAnswers);
      }
    }, 400);
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

        {/* Card */}
        <div
          key={question.id}
          className="mt-8 rounded-2xl border border-border bg-card shadow-sm overflow-hidden animate-fade-in-up"
        >
          {/* Pergunta header */}
          <div className="pt-6 px-6">
            <p className="text-center text-sm font-bold italic text-muted-foreground/60 tracking-wide mb-6">
              Pergunta
            </p>
          </div>

          {/* Question text */}
          <div className="px-6 pb-8 min-h-[140px] flex items-start">
            <h2 className="text-xl md:text-2xl font-bold leading-tight text-foreground">
              {question.text}
            </h2>
          </div>

          {/* SIM / NÃO buttons */}
          <div className="flex">
            <button
              onClick={() => handleAnswer('yes')}
              className={cn(
                "flex-1 py-4 text-2xl font-black uppercase tracking-wider text-white transition-all",
                selectedValue === 'yes'
                  ? "bg-emerald-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
              )}
            >
              sim
            </button>
            <button
              onClick={() => handleAnswer('no')}
              className={cn(
                "flex-1 py-4 text-2xl font-black uppercase tracking-wider text-white transition-all",
                selectedValue === 'no'
                  ? "bg-red-900"
                  : "bg-red-800 hover:bg-red-900"
              )}
            >
              não
            </button>
          </div>

          {/* Type labels below buttons */}
          <div className="flex bg-card">
            {/* SIM label - primary type */}
            <div className="flex-1 flex flex-col items-center gap-2 py-5">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: primaryProfile.color }}
              >
                <span className="text-white text-lg">{primaryProfile.emoji}</span>
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: primaryProfile.color }}
              >
                {question.yesLabel}
              </span>
            </div>

            {/* NÃO label - antagonist type */}
            <div className="flex-1 flex flex-col items-center gap-2 py-5">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: antagonistProfile.color }}
              >
                <span className="text-white text-lg">{antagonistProfile.emoji}</span>
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: antagonistProfile.color }}
              >
                {question.noLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
