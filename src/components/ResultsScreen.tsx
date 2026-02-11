import { RotateCcw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { questions, riasecProfiles, antagonisms, type RiasecType } from "@/data/quizQuestions";

interface ResultsScreenProps {
  answers: Record<number, 'yes' | 'no'>;
  onRestart: () => void;
}

function calculateScores(answers: Record<number, 'yes' | 'no'>) {
  const scores: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer === 'yes') {
      scores[q.type] += 1;
    } else if (answer === 'no') {
      scores[antagonisms[q.type]] += 1;
    }
  });
  return scores;
}

const ResultsScreen = ({ answers, onRestart }: ResultsScreenProps) => {
  const scores = calculateScores(answers);
  const maxScore = 18; // each question awards 1 point to either the type or its antagonist

  const chartData = (Object.keys(riasecProfiles) as RiasecType[]).map((type) => ({
    subject: riasecProfiles[type].name,
    value: scores[type],
    fullMark: maxScore,
  }));

  const sorted = (Object.entries(scores) as [RiasecType, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  const dominantType = sorted[0][0];
  const dominantProfile = riasecProfiles[dominantType];

  const handleShare = async () => {
    const text = `Meu perfil RIASEC dominante é ${dominantProfile.emoji} ${dominantProfile.name}! Faça o teste vocacional Trampos Game e descubra o seu.`;
    if (navigator.share) {
      await navigator.share({ title: "Trampos Game - Resultado", text });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Resultado copiado!");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="w-full max-w-lg mx-auto space-y-6">
        {/* Header - dominant profile */}
        <div className="text-center animate-fade-in-up">
          <p className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--trampos-purple))] mb-2">
            Seu Resultado
          </p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-4xl">{dominantProfile.emoji}</span>
            <h2 className="text-4xl font-extrabold text-foreground">
              {dominantProfile.name}
            </h2>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {dominantProfile.description}
          </p>
        </div>

        {/* Radar Chart */}
        <Card className="animate-fade-in-up-delay rounded-2xl border border-border/50 shadow-sm">
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 13, fill: "hsl(var(--foreground))", fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, maxScore]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Pontuação"
                  dataKey="value"
                  stroke="hsl(var(--trampos-purple))"
                  fill="hsl(var(--trampos-purple))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* All profiles as cards */}
        <div className="animate-fade-in-up-delay-2 space-y-4">
          {sorted.map(([type, score]) => {
            const profile = riasecProfiles[type];
            const pct = (score / maxScore) * 100;
            const isDominant = type === dominantType;
            return (
              <Card
                key={type}
                className={`rounded-2xl shadow-sm ${
                  isDominant
                    ? "border-2 border-[hsl(var(--trampos-purple))]"
                    : "border border-border/50"
                }`}
              >
                <CardContent className="p-5 space-y-3">
                  {/* Title row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{profile.emoji}</span>
                      <span className="text-lg font-bold text-foreground">
                        {profile.name}
                      </span>
                      {isDominant && (
                        <span className="rounded-full border border-[hsl(var(--trampos-purple))] px-2.5 py-0.5 text-xs font-semibold text-[hsl(var(--trampos-purple))]">
                          Destaque
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold" style={{ color: profile.color }}>
                        {score}
                      </span>
                      <span className="text-sm text-muted-foreground">/{maxScore}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: profile.color }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {profile.description}
                  </p>

                  {/* Career tags */}
                  <div className="flex flex-wrap gap-2">
                    {profile.careers.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3 animate-fade-in-up-delay-2 pb-8">
          <Button
            onClick={onRestart}
            variant="outline"
            className="flex-1 rounded-full h-12"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Refazer
          </Button>
          <Button
            onClick={handleShare}
            className="flex-1 rounded-full bg-[hsl(var(--trampos-purple))] text-white hover:bg-[hsl(var(--trampos-purple))]/90 h-12"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
