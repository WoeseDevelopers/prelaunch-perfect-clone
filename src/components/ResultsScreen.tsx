import React from "react";
import { IconRefresh, IconShare, IconCheck, IconX } from "@tabler/icons-react";
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
import RiasecIcon from "@/components/RiasecIcon";

interface ResultsScreenProps {
  answers: Record<number, 'yes' | 'no'>;
  onRestart: () => void;
}

function calculateScores(answers: Record<number, 'yes' | 'no'>) {
  const scores: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer === 'yes') scores[q.yesType] += 1;
    else if (answer === 'no') scores[q.noType] += 1;
  });
  return scores;
}

function calculateSimNao(answers: Record<number, 'yes' | 'no'>) {
  const sim: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const nao: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer === 'yes') sim[q.yesType] += 1;
    else if (answer === 'no') nao[q.noType] += 1;
  });
  return { sim, nao };
}

function getActivatedLabels(answers: Record<number, 'yes' | 'no'>) {
  const labels: Record<RiasecType, string[]> = { R: [], I: [], A: [], S: [], E: [], C: [] };
  questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer === 'yes') labels[q.yesType].push(q.yesLabel);
    else if (answer === 'no') labels[q.noType].push(q.noLabel);
  });
  return labels;
}

const ResultsScreen = ({ answers, onRestart }: ResultsScreenProps) => {
  const scores = calculateScores(answers);
  const { sim, nao } = calculateSimNao(answers);
  const activatedLabels = getActivatedLabels(answers);
  const maxScore = 18;

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
    const text = `Meu perfil RIASEC dominante é ${dominantProfile.name}! Faça o teste vocacional Trampos Game e descubra o seu.`;
    if (navigator.share) {
      await navigator.share({ title: "Trampos Game - Resultado", text });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Resultado copiado!");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="w-full max-w-[980px] mx-auto space-y-6">
        {/* Header - dominant profile */}
        <div className="text-center animate-fade-in-up">
          <p className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--trampos-purple))] mb-2">
            Seu Resultado
          </p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <RiasecIcon name={dominantProfile.icon} size={72} className="text-foreground" />
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

        {/* Unified type cards - side by side layout */}
        <div className="animate-fade-in-up-delay space-y-4">
          {sorted.map(([type, score]) => {
            const profile = riasecProfiles[type];
            const pct = (score / maxScore) * 100;
            const isDominant = type === dominantType;
            const active = activatedLabels[type];
            return (
              <Card
                key={type}
                className={`rounded-2xl shadow-sm overflow-hidden ${
                  isDominant
                    ? "border-2 border-[hsl(var(--trampos-purple))]"
                    : "border border-border/50"
                }`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* LEFT: Stats + Subdivisions */}
                    <div className="flex-1 md:border-r border-border/30">
                      {/* Stats header */}
                      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/30">
                        <span className="text-xs font-semibold text-muted-foreground">Tipo</span>
                        <div className="ml-auto flex items-center gap-4">
                          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-muted-foreground">
                            <IconCheck className="h-4 w-4 text-emerald-500" /> SIM
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-muted-foreground">
                            <IconX className="h-4 w-4 text-red-500" /> NÃO
                          </span>
                          <span className="text-xs font-semibold text-muted-foreground">Pontos</span>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className={`flex items-center gap-2 px-3 py-2.5 ${isDominant ? "bg-[hsl(var(--trampos-purple))]/5" : ""}`}>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: profile.color }}
                        >
                          <RiasecIcon name={profile.icon} size={20} className="text-white" />
                        </div>
                        <span className={`font-bold text-sm ${isDominant ? "text-[hsl(var(--trampos-purple))]" : "text-foreground"}`}>
                          {profile.name}
                        </span>
                        {isDominant && (
                          <span className="rounded-full bg-[hsl(var(--trampos-purple))] px-1.5 py-0.5 text-[9px] font-bold text-white">
                            TOP
                          </span>
                        )}
                        <div className="ml-auto flex items-center gap-5 shrink-0">
                          <span className="font-bold text-emerald-600">{sim[type]}</span>
                          <span className="font-bold text-red-500">{nao[type]}</span>
                          <span className="font-extrabold text-lg" style={{ color: profile.color }}>
                            {score}
                          </span>
                        </div>
                      </div>

                      {/* Subdivisions */}
                      <div className="px-3 py-2.5 border-t border-border/30">
                        <div className="flex flex-wrap gap-1.5">
                          {profile.subdivisions.map((sub) => {
                            const isActive = active.includes(sub);
                            return (
                              <span
                                key={sub}
                                className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                                style={{
                                  backgroundColor: isActive ? profile.color : 'transparent',
                                  color: isActive ? '#fff' : profile.color,
                                  border: `1.5px solid ${profile.color}`,
                                  opacity: isActive ? 1 : 0.3,
                                }}
                              >
                                {sub}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: Detail card */}
                    <div className="flex-1 p-4 space-y-2.5 border-t md:border-t-0 border-border/30">
                      {/* Title row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <RiasecIcon name={profile.icon} size={28} className="text-foreground" />
                          <span className="text-base font-bold text-foreground">{profile.name}</span>
                          {isDominant && (
                            <span className="rounded-full border border-[hsl(var(--trampos-purple))] px-2 py-0.5 text-[10px] font-semibold text-[hsl(var(--trampos-purple))]">
                              Destaque
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold" style={{ color: profile.color }}>{score}</span>
                          <span className="text-xs text-muted-foreground">/{maxScore}</span>
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
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {profile.description}
                      </p>

                      {/* Career tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {profile.careers.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[10px] font-medium text-foreground/80"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Totals row */}
          <Card className="rounded-2xl border border-border/50 shadow-sm">
            <CardContent className="px-4 py-3 flex items-center gap-3">
              <span className="font-bold text-foreground">Total</span>
              <div className="ml-auto flex items-center gap-5">
                <span className="font-bold text-emerald-600">
                  {Object.values(sim).reduce((a, b) => a + b, 0)}
                </span>
                <span className="font-bold text-red-500">
                  {Object.values(nao).reduce((a, b) => a + b, 0)}
                </span>
                <span className="font-extrabold text-lg text-foreground">
                  {Object.values(scores).reduce((a, b) => a + b, 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-3 animate-fade-in-up-delay-2 pb-8">
          <Button
            onClick={onRestart}
            variant="outline"
            className="flex-1 rounded-full h-12"
          >
            <IconRefresh className="h-8 w-8 mr-2" />
            Refazer
          </Button>
          <Button
            onClick={handleShare}
            className="flex-1 rounded-full bg-[hsl(var(--trampos-purple))] text-white hover:bg-[hsl(var(--trampos-purple))]/90 h-12"
          >
            <IconShare className="h-8 w-8 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
