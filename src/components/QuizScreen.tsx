import { useState, useMemo } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { Progress } from "@/components/ui/progress";
import { type RiasecType, questions, riasecProfiles } from "@/data/quizQuestions";
import RiasecIcon from "@/components/RiasecIcon";
import SubtypeModal from "@/components/SubtypeModal";
import { cn } from "@/lib/utils";

interface QuizScreenProps {
  onComplete: (answers: Record<number, 'yes' | 'no'>) => void;
  onBack: () => void;
}

const QuizScreen = ({ onComplete, onBack }: QuizScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no'>>({});
  const [revealed, setRevealed] = useState(false);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const selectedValue = answers[question.id];

  const yesProfile = riasecProfiles[question.yesType];
  const noProfile = riasecProfiles[question.noType];

  // Compute subtype scores from answers
  const subtypeScores = useMemo(() => {
    const s: Record<string, number> = {};
    for (const q of questions) {
      const ans = answers[q.id];
      if (ans === 'yes') s[q.yesLabel] = (s[q.yesLabel] || 0) + 1;
      else if (ans === 'no') s[q.noLabel] = (s[q.noLabel] || 0) + 1;
    }
    return s;
  }, [answers]);

  // Type score = sum of its subtypes
  const scores = useMemo(() => {
    const s: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    for (const type of ['R', 'I', 'A', 'S', 'E', 'C'] as RiasecType[]) {
      const profile = riasecProfiles[type];
      for (const sub of profile.subdivisions) {
        s[type] += subtypeScores[sub] || 0;
      }
    }
    return s;
  }, [subtypeScores]);

  const totalAnswered = Object.keys(answers).length;
  const [selectedType, setSelectedType] = useState<RiasecType | null>(null);

  const handleAnswer = (value: 'yes' | 'no') => {
    if (revealed) return;
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    setRevealed(true);

    setTimeout(() => {
      setRevealed(false);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete(newAnswers);
      }
    }, 1800);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen px-4 pt-4 pb-40 flex flex-col items-center">
      <div className="w-full max-w-[400px]">
        {/* Header */}
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

        <Progress value={progress} className="h-2 bg-secondary mb-0" />

        {/* Outer frame — NO key here so React doesn't remount */}
        <div
          className="mt-8 rounded-3xl bg-card shadow-sm animate-fade-in-up"
          style={{ padding: '20px' }}
        >
          {/* Inner card — grows downward only */}
          <div
            className="rounded-2xl border border-border overflow-hidden bg-card"
            style={{ transformOrigin: 'top center' }}
          >
            {/* Fixed content area with stable height */}
            <div style={{ height: '500px' }} className="flex flex-col">
              {/* "Pergunta" label */}
              <div className="pt-5 px-5">
                <p
                  className="text-center text-sm font-bold italic text-muted-foreground/60 tracking-wide"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Pergunta
                </p>
              </div>

              {/* Question text */}
              <div className="flex-1 flex items-center justify-center px-5">
                <h2
                  key={question.id}
                  className="font-bold leading-snug text-foreground text-center animate-fade-in-up"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.5rem' }}
                >
                  {question.text}
                </h2>
              </div>

              {/* SIM / NÃO buttons — always at bottom of 500px area */}
              <div className="flex gap-[2px]">
                <button
                  onClick={() => handleAnswer('yes')}
                  disabled={revealed}
                  className={cn(
                    "flex-1 cursor-pointer transition-opacity",
                    selectedValue === 'yes' ? "opacity-90" : "hover:opacity-90"
                  )}
                >
                  <div
                    className={cn(
                      "py-5 text-2xl font-extrabold uppercase tracking-wider text-white w-full",
                      selectedValue === 'yes' ? "bg-emerald-700" : "bg-emerald-600"
                    )}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    SIM
                  </div>
                </button>
                <button
                  onClick={() => handleAnswer('no')}
                  disabled={revealed}
                  className={cn(
                    "flex-1 cursor-pointer transition-opacity",
                    selectedValue === 'no' ? "opacity-90" : "hover:opacity-90"
                  )}
                >
                  <div
                    className={cn(
                      "py-5 text-2xl font-extrabold uppercase tracking-wider text-white w-full",
                      selectedValue === 'no' ? "bg-red-900" : "bg-red-800"
                    )}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    NÃO
                  </div>
                </button>
              </div>
            </div>

            {/* Drawer area — expands BELOW the 500px fixed area */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: revealed ? '1fr' : '0fr',
                opacity: revealed ? 1 : 0,
                transition: 'grid-template-rows 500ms cubic-bezier(0.33, 1, 0.68, 1), opacity 400ms ease',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
              <div className="flex gap-[2px]">
                <div className="flex-1 flex flex-col items-center gap-2 py-5 bg-card border-r border-border/50">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: yesProfile.color }}
                  >
                    <RiasecIcon name={yesProfile.icon} className="text-white" size={26} />
                  </div>
                  <span
                    className="text-xs font-extrabold uppercase tracking-wide"
                    style={{ color: yesProfile.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {yesProfile.name}
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-2 py-5 bg-card">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: noProfile.color }}
                  >
                    <RiasecIcon name={noProfile.icon} className="text-white" size={26} />
                  </div>
                  <span
                    className="text-xs font-extrabold uppercase tracking-wide"
                    style={{ color: noProfile.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {noProfile.name}
                  </span>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fichas tracker - Fixed at bottom */}
      {totalAnswered > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent z-50 flex justify-center pointer-events-none">
          <div className="w-full max-w-[400px] pointer-events-auto">
            <div className="rounded-2xl bg-card border border-border p-4 shadow-lg animate-fade-in-up">
              <p
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 text-center"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Suas Fichas
              </p>
              <div className="grid grid-cols-6 gap-2">
                {(['R', 'I', 'A', 'S', 'E', 'C'] as RiasecType[]).map((type) => {
                  const profile = riasecProfiles[type];
                  const count = scores[type];
                  return (
                    <button
                      key={type}
                      className="flex flex-col items-center gap-1.5 cursor-pointer"
                      onClick={() => setSelectedType(type)}
                    >
                      <div
                        className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: count > 0 ? profile.color : 'transparent',
                          border: `2px solid ${profile.color}`,
                          opacity: count > 0 ? 1 : 0.3,
                          transform: count > 0 ? 'scale(1)' : 'scale(0.85)',
                        }}
                      >
                        <RiasecIcon
                          name={profile.icon}
                          className={count > 0 ? "text-white" : "text-muted-foreground"}
                          size={18}
                        />
                        {count > 0 && (
                          <span
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                          >
                            {count}
                          </span>
                        )}
                      </div>
                      <span
                        className="text-[9px] font-bold uppercase tracking-wide"
                        style={{
                          color: count > 0 ? profile.color : 'hsl(var(--muted-foreground))',
                          fontFamily: "'Syne', sans-serif",
                        }}
                      >
                        {profile.name.slice(0, 3)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <SubtypeModal
        riasecType={selectedType}
        open={!!selectedType}
        onOpenChange={(open) => !open && setSelectedType(null)}
        subtypeScores={subtypeScores}
      />
    </div>
  );
};

export default QuizScreen;
