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
  onRestart?: () => void;
}

const CareersTab = ({ perTypeSubtypeCounts, onRestart }: CareersTabProps) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<MatchLevel>('Excelente');
  const [visibleCount, setVisibleCount] = useState(6);

  const groupedCareers = useMemo(() => {

    const scored = careerDetails.map((career, idx) => {
      // Match based on how many subtypes of the career's PRIMARY RIASEC type are active
      const primaryType = career.type;
      const profile = riasecProfiles[primaryType];
      const activeSubtypesOfType = profile.subdivisions.filter(
        (sub) => (perTypeSubtypeCounts[`${primaryType}_${sub}`] || 0) > 0
      ).length;
      const matchCount = Math.min(activeSubtypesOfType, 4);
      const subtypeSum = career.relatedSubtypes.reduce(
        (sum, sub) => sum + (perTypeSubtypeCounts[`${sub.type}_${sub.label}`] || 0), 0
      );
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

    return grouped;
  }, [perTypeSubtypeCounts]);

  const currentCareers = groupedCareers[activeSubTab];
  const displayCareers = currentCareers.slice(0, visibleCount);
  const hasMore = currentCareers.length > visibleCount;

  // Reset visible count when switching sub-tabs
  const handleSubTabChange = (level: MatchLevel) => {
    setActiveSubTab(level);
    setVisibleCount(6);
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
      {displayCareers.length === 0 && activeSubTab !== 'Refazer' && (
        <Card className="rounded-2xl border border-border/50">
          <CardContent className="p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhuma profissão nesta classificação.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
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
                <div className="px-4 pb-2">
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {career.description}
                  </p>
                </div>

                {/* Strengths */}
                <div className="mx-4 rounded-xl overflow-hidden border border-border/50 mb-1.5">
                  <div className="px-3 py-1.5 border-l-4" style={{ borderLeftColor: 'hsl(142, 71%, 45%)' }}>
                    <p className="text-[10px] font-bold text-foreground mb-0.5">Ponto forte</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                      {career.strengths}
                    </p>
                  </div>
                </div>

                {/* Weaknesses */}
                <div className="mx-4 rounded-xl overflow-hidden border border-border/50 mb-3">
                  <div className="px-3 py-1.5 border-l-4" style={{ borderLeftColor: 'hsl(0, 84%, 60%)' }}>
                    <p className="text-[10px] font-bold text-foreground mb-0.5">Ponto fraco</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                      {career.weaknesses}
                    </p>
                  </div>
                </div>

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

      {/* Show more button */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wide border-2 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            Mostrar mais profissões
          </button>
        </div>
      )}

      <CareerModal
        career={selectedCareer}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default CareersTab;
