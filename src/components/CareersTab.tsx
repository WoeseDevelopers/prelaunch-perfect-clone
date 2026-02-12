import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { riasecProfiles, type RiasecType, type Question, computeSubtypeCounts } from "@/data/quizQuestions";
import { careerDetails, type CareerDetail } from "@/data/careerDetails";
import RiasecIcon from "@/components/RiasecIcon";
import CareerModal from "@/components/CareerModal";
import { IconRefresh } from "@tabler/icons-react";

type MatchLevel = 'Excelente' | 'Bom' | 'Atenção' | 'Refazer';

function getMatchLevel(matchCount: number): MatchLevel {
  if (matchCount >= 4) return 'Excelente';
  if (matchCount === 3) return 'Bom';
  if (matchCount === 2) return 'Atenção';
  return 'Refazer';
}

const matchLevelConfig: Record<MatchLevel, { bg: string; text: string; label: string; fraction: string }> = {
  Excelente: { bg: 'hsl(142, 71%, 45%)', text: '#fff', label: 'Excelente', fraction: '4/4' },
  Bom: { bg: 'hsl(217, 91%, 60%)', text: '#fff', label: 'Bom', fraction: '3/4' },
  Atenção: { bg: 'hsl(47, 96%, 53%)', text: '#000', label: 'Atenção', fraction: '2/4' },
  Refazer: { bg: 'hsl(0, 84%, 60%)', text: '#fff', label: 'Refazer', fraction: '1/4' },
};

const subTabOrder: MatchLevel[] = ['Excelente', 'Bom', 'Atenção', 'Refazer'];

interface CareersTabProps {
  answers: Record<number, 'yes' | 'no'>;
  sessionQuestions: Question[];
  onRestart?: () => void;
}

const CareersTab = ({ answers, sessionQuestions, onRestart }: CareersTabProps) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<MatchLevel>('Excelente');

  const { groupedCareers, allSubtypeCounts } = useMemo(() => {
    const allSubtypeCounts = computeSubtypeCounts(sessionQuestions, answers);

    const subtypeRecency: Record<string, number> = {};
    for (let i = 0; i < sessionQuestions.length; i++) {
      const q = sessionQuestions[i];
      const ans = answers[q.id];
      if (!ans) continue;
      const sub = ans === 'yes' ? q.yesSub : q.noSub;
      if (sub) {
        subtypeRecency[sub] = i;
      }
    }

    const sortedSubtypes = Object.entries(allSubtypeCounts)
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return (subtypeRecency[b[0]] || 0) - (subtypeRecency[a[0]] || 0);
      });
    const playerTopSubtypes = new Set(sortedSubtypes.slice(0, 4).map(([name]) => name));

    const scored = careerDetails.map((career, idx) => {
      const careerSubLabels = career.relatedSubtypes.map((s) => s.label);
      const matchCount = careerSubLabels.filter((label) => playerTopSubtypes.has(label)).length;
      const subtypeSum = careerSubLabels.reduce((sum, label) => sum + (allSubtypeCounts[label] || 0), 0);
      const level = getMatchLevel(matchCount);
      return { career, matchCount, subtypeSum, idx, level };
    });

    scored.sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      if (b.subtypeSum !== a.subtypeSum) return b.subtypeSum - a.subtypeSum;
      return a.idx - b.idx;
    });

    const seen = new Set<string>();
    const unique = scored.filter((s) => {
      const key = s.career.name + '_' + s.career.type;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const grouped: Record<MatchLevel, typeof unique> = {
      Excelente: [],
      Bom: [],
      Atenção: [],
      Refazer: [],
    };
    for (const item of unique) {
      grouped[item.level].push(item);
    }

    return { groupedCareers: grouped, allSubtypeCounts };
  }, [answers, sessionQuestions]);

  const currentCareers = groupedCareers[activeSubTab];
  const displayCareers = currentCareers.slice(0, 6);

  return (
    <div className="space-y-5 animate-fade-in-up-delay">
      {/* Sub-tab switcher */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {subTabOrder.map((level) => {
          const config = matchLevelConfig[level];
          const count = groupedCareers[level].length;
          const isActive = activeSubTab === level;

          return (
            <button
              key={level}
              onClick={() => setActiveSubTab(level)}
              className="flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-300 whitespace-nowrap shrink-0"
              style={{
                backgroundColor: isActive ? config.bg : 'transparent',
                color: isActive ? config.text : 'hsl(var(--muted-foreground))',
                border: `2px solid ${isActive ? config.bg : 'hsl(var(--border))'}`,
                opacity: isActive ? 1 : 0.7,
              }}
            >
              <span>{config.fraction}</span>
              <span>{config.label}</span>
              <span
                className="inline-flex items-center justify-center rounded-full text-[10px] font-bold w-5 h-5"
                style={{
                  backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'hsl(var(--secondary))',
                  color: isActive ? config.text : 'hsl(var(--muted-foreground))',
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Refazer recommendation */}
      {activeSubTab === 'Refazer' && (
        <Card className="rounded-2xl border-2 border-dashed border-[hsl(0,84%,60%)]/30 bg-[hsl(0,84%,60%)]/5">
          <CardContent className="p-5 text-center space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Essas profissões tiveram pouca correspondência com seu perfil atual.
              Refaça o teste para explorar novas possibilidades!
            </p>
            {onRestart && (
              <button
                onClick={onRestart}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-300"
                style={{
                  backgroundColor: 'hsl(0, 84%, 60%)',
                  color: '#fff',
                }}
              >
                <IconRefresh className="h-4 w-4" />
                Refazer teste
              </button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Career cards */}
      {displayCareers.length === 0 && activeSubTab !== 'Refazer' && (
        <Card className="rounded-2xl border border-border/50">
          <CardContent className="p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhuma profissão nesta classificação.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-[30px]">
        {displayCareers.map(({ career, matchCount }) => {
          const level = getMatchLevel(matchCount);
          const levelStyle = matchLevelConfig[level];

          return (
            <Card
              key={career.name + '_' + career.type}
              className="rounded-2xl border border-border/50 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setSelectedCareer(career);
                setModalOpen(true);
              }}
            >
              <CardContent className="p-0">
                {/* Header */}
                <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
                  <h3
                    className="text-xl font-extrabold text-foreground leading-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {career.name}
                  </h3>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: levelStyle.bg, color: levelStyle.text }}
                  >
                    {level}
                  </span>
                </div>

                {/* Description */}
                <div className="px-5 pb-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {career.description}
                  </p>
                </div>

                {/* Strengths */}
                <div className="mx-5 rounded-xl overflow-hidden border border-border/50 mb-2">
                  <div className="px-4 py-2 border-l-4" style={{ borderLeftColor: 'hsl(142, 71%, 45%)' }}>
                    <p className="text-xs font-bold text-foreground mb-1">Ponto forte</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {career.strengths}
                    </p>
                  </div>
                </div>

                {/* Weaknesses */}
                <div className="mx-5 rounded-xl overflow-hidden border border-border/50 mb-4">
                  <div className="px-4 py-2 border-l-4" style={{ borderLeftColor: 'hsl(0, 84%, 60%)' }}>
                    <p className="text-xs font-bold text-foreground mb-1">Ponto fraco</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {career.weaknesses}
                    </p>
                  </div>
                </div>

                {/* Footer: 4 subtype icons */}
                <div className="px-5 pb-5">
                  <div className="flex items-center justify-center gap-5">
                    {career.relatedSubtypes.map((sub) => {
                      const subProfile = riasecProfiles[sub.type];
                      const count = allSubtypeCounts[sub.label] || 0;
                      return (
                        <div key={sub.label} className="flex flex-col items-center gap-1.5">
                          <div className="relative">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: subProfile.color }}
                            >
                              <RiasecIcon name={subProfile.icon} size={22} className="text-white" />
                            </div>
                            {count > 0 && (
                              <span
                                className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full text-[9px] font-bold"
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  backgroundColor: '#fff',
                                  color: subProfile.color,
                                  border: `2px solid ${subProfile.color}`,
                                }}
                              >
                                {String(count).padStart(2, '0')}
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground text-center max-w-[70px] leading-tight">
                            {sub.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <CareerModal
        career={selectedCareer}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default CareersTab;
