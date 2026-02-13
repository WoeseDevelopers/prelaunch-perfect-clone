import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { riasecProfiles, type RiasecType } from "@/data/quizQuestions";
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
  perTypeSubtypeCounts: Record<string, number>;
  dominantType: import('@/data/quizQuestions').RiasecType;
  onRestart?: () => void;
}

const CareersTab = ({ perTypeSubtypeCounts, dominantType, onRestart }: CareersTabProps) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<MatchLevel>('Excelente');

  const groupedCareers = useMemo(() => {
    // Analyze ALL careers across all types
    const scored = careerDetails.map((career, idx) => {
      const matchCount = career.relatedSubtypes.filter(
        (sub) => (perTypeSubtypeCounts[`${sub.type}_${sub.label}`] || 0) > 0
      ).length;
      const subtypeSum = career.relatedSubtypes.reduce(
        (sum, sub) => sum + (perTypeSubtypeCounts[`${sub.type}_${sub.label}`] || 0), 0
      );
      const level = getMatchLevel(matchCount);
      return { career, matchCount, subtypeSum, idx, level };
    });

    // Sort within each level: subtypeSum desc → idx asc
    scored.sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      const aIsDom = a.career.type === dominantType ? 1 : 0;
      const bIsDom = b.career.type === dominantType ? 1 : 0;
      if (bIsDom !== aIsDom) return bIsDom - aIsDom;
      if (b.subtypeSum !== a.subtypeSum) return b.subtypeSum - a.subtypeSum;
      return a.idx - b.idx;
    });

    const grouped: Record<MatchLevel, typeof scored> = {
      Excelente: [],
      Bom: [],
      Atenção: [],
      Refazer: [],
    };
    for (const item of scored) {
      grouped[item.level].push(item);
    }

    // Keep only top 4 per tab
    for (const level of subTabOrder) {
      const all = grouped[level];
      const dominant = all.filter(item => item.career.type === dominantType);
      const others = all.filter(item => item.career.type !== dominantType);
      const selected = [...dominant.slice(0, 4)];
      const remaining = 4 - selected.length;
      if (remaining > 0) {
        selected.push(...others.slice(0, remaining));
      }
      grouped[level] = selected;
    }

    return grouped;
  }, [perTypeSubtypeCounts, dominantType]);

  const currentCareers = groupedCareers[activeSubTab];

  // Reset visible count when switching sub-tabs
  const handleSubTabChange = (level: MatchLevel) => {
    setActiveSubTab(level);
  };

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
              onClick={() => handleSubTabChange(level)}
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
      {currentCareers.length === 0 && activeSubTab !== 'Refazer' && (
        <Card className="rounded-2xl border border-border/50">
          <CardContent className="p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhuma profissão nesta classificação.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        {currentCareers.map(({ career, matchCount }) => {
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
                <div className="px-4 pt-4 pb-2 flex items-start justify-between gap-2">
                  <h3
                    className="text-base font-extrabold text-foreground leading-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {career.name}
                  </h3>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: levelStyle.bg, color: levelStyle.text }}
                  >
                    {level}
                  </span>
                </div>

                {/* Description */}
                {career.description && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {career.description}
                    </p>
                  </div>
                )}

                {/* Strengths */}
                {career.strengths && (
                  <div className="mx-4 rounded-xl overflow-hidden border border-border/50 mb-1.5">
                    <div className="px-3 py-1.5 border-l-4" style={{ borderLeftColor: 'hsl(142, 71%, 45%)' }}>
                      <p className="text-[10px] font-bold text-foreground mb-0.5">Ponto forte</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                        {career.strengths}
                      </p>
                    </div>
                  </div>
                )}

                {/* Weaknesses */}
                {career.weaknesses && (
                  <div className="mx-4 rounded-xl overflow-hidden border border-border/50 mb-3">
                    <div className="px-3 py-1.5 border-l-4" style={{ borderLeftColor: 'hsl(0, 84%, 60%)' }}>
                      <p className="text-[10px] font-bold text-foreground mb-0.5">Ponto fraco</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                        {career.weaknesses}
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer: 4 subtype icons */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-center gap-3">
                    {career.relatedSubtypes.map((sub) => {
                      const subProfile = riasecProfiles[sub.type];
                      const count = perTypeSubtypeCounts[`${sub.type}_${sub.label}`] || 0;
                      return (
                        <div key={sub.label} className="flex flex-col items-center gap-1">
                          <div className="relative">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: subProfile.color }}
                            >
                              <RiasecIcon name={subProfile.icon} size={16} className="text-white" />
                            </div>
                            {count > 0 && (
                              <span
                                className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full text-[8px] font-bold"
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  backgroundColor: '#fff',
                                  color: subProfile.color,
                                  border: `2px solid ${subProfile.color}`,
                                }}
                              >
                                {String(count).padStart(2, '0')}
                              </span>
                            )}
                          </div>
                          <span className="text-[7px] font-bold uppercase tracking-wide text-muted-foreground text-center max-w-[50px] leading-tight">
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
