import { useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { Progress } from "@/components/ui/progress";
import { questions, riasecProfiles } from "@/data/quizQuestions";
import RiasecIcon from "@/components/RiasecIcon";
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
  const yesProfile = riasecProfiles[question.yesType];
  const noProfile = riasecProfiles[question.noType];

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
    <div className="min-h-screen px-4 py-4 flex flex-col items-center">
      <div className="w-full max-w-[400px]">
        {/* Header with back + counter */}
        <div className="flex items-center justify-between mb-2 animate-fade-in-up">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconArrowLeft className="h-8 w-8" />
            Voltar
          </button>
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <Progress value={progress} className="h-2 bg-secondary mb-0" />

        {/* Outer white border frame */}
        <div
          key={question.id}
          className="mt-8 rounded-3xl bg-card shadow-sm animate-fade-in-up"
          style={{ padding: '20px' }}
        >
          {/* Inner card */}
          <div
            className="rounded-2xl border border-border overflow-hidden flex flex-col bg-card"
            style={{ aspectRatio: '1 / 2' }}
          >
            {/* Question area */}
            <div className="flex-1 flex flex-col items-center justify-center px-5 py-6">
              <p
                className="text-sm font-bold italic text-muted-foreground/60 tracking-wide mb-6"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Pergunta
              </p>
              <h2
                className="text-lg font-bold leading-snug text-foreground text-center"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {question.text}
              </h2>
            </div>

            {/* SIM / NÃO buttons */}
            <div className="flex gap-[2px]">
              <button
                onClick={() => handleAnswer('yes')}
                className={cn(
                  "flex-1 py-5 text-2xl font-extrabold uppercase tracking-wider text-white transition-all",
                  selectedValue === 'yes'
                    ? "bg-emerald-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                )}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                SIM
              </button>
              <button
                onClick={() => handleAnswer('no')}
                className={cn(
                  "flex-1 py-5 text-2xl font-extrabold uppercase tracking-wider text-white transition-all",
                  selectedValue === 'no'
                    ? "bg-red-900"
                    : "bg-red-800 hover:bg-red-900"
                )}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                NÃO
              </button>
            </div>

            {/* Type labels */}
            <div className="flex bg-card">
              <div className="flex-1 flex flex-col items-center gap-2 py-5 border-r border-border/50">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: yesProfile.color }}
                >
                  <RiasecIcon name={yesProfile.icon} className="text-white" size={26} />
                </div>
                <span
                  className="text-xs font-extrabold uppercase tracking-wide"
                  style={{ color: yesProfile.color, fontFamily: "'Syne', sans-serif" }}
                >
                  {yesProfile.name}
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2 py-5">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: noProfile.color }}
                >
                  <RiasecIcon name={noProfile.icon} className="text-white" size={26} />
                </div>
                <span
                  className="text-xs font-extrabold uppercase tracking-wide"
                  style={{ color: noProfile.color, fontFamily: "'Syne', sans-serif" }}
                >
                  {noProfile.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
