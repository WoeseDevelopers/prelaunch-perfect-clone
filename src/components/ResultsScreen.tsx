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
import { questions, riasecProfiles, type RiasecType } from "@/data/quizQuestions";

interface ResultsScreenProps {
  answers: Record<number, number>;
  onRestart: () => void;
}

function calculateScores(answers: Record<number, number>) {
  const scores: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  questions.forEach((q) => {
    scores[q.type] += answers[q.id] || 0;
  });
  return scores;
}

const ResultsScreen = ({ answers, onRestart }: ResultsScreenProps) => {
  const scores = calculateScores(answers);
  const maxScore = 15; // 3 questions * 5 max

  const chartData = (Object.keys(riasecProfiles) as RiasecType[]).map((type) => ({
    subject: riasecProfiles[type].name,
    value: scores[type],
    fullMark: maxScore,
  }));

  const dominant = (Object.entries(scores) as [RiasecType, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0];
  const dominantProfile = riasecProfiles[dominant[0]];

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
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-3xl font-extrabold">
            <span className="trampos-gradient">Seu Resultado</span>
          </h2>
          <p className="mt-1 text-muted-foreground">Perfil RIASEC</p>
        </div>

        {/* Radar Chart */}
        <Card className="animate-fade-in-up-delay rounded-2xl border border-border/50 shadow-lg">
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
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
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Dominant Profile */}
        <Card className="animate-fade-in-up-delay rounded-2xl border-2 border-[hsl(var(--trampos-purple))]/30 shadow-lg">
          <CardContent className="p-6 space-y-3 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Perfil Dominante
            </p>
            <p className="text-4xl">{dominantProfile.emoji}</p>
            <h3 className="text-xl font-bold text-foreground">{dominantProfile.name}</h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              {dominantProfile.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {dominantProfile.careers.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-[hsl(var(--trampos-purple))]/10 px-3 py-1 text-xs font-medium text-[hsl(var(--trampos-purple))]"
                >
                  {c}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All profiles summary */}
        <div className="animate-fade-in-up-delay-2 space-y-3">
          {(Object.entries(scores) as [RiasecType, number][])
            .sort((a, b) => b[1] - a[1])
            .map(([type, score]) => {
              const profile = riasecProfiles[type];
              const pct = (score / maxScore) * 100;
              return (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-lg">{profile.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{profile.name}</span>
                      <span className="text-muted-foreground">{score}/{maxScore}</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: profile.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Actions */}
        <div className="flex gap-3 animate-fade-in-up-delay-2">
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
