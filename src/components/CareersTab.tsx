import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { riasecProfiles, type RiasecType, type Question, computeSubtypeCounts } from "@/data/quizQuestions";
import { careerDetails, type CareerDetail } from "@/data/careerDetails";
import RiasecIcon from "@/components/RiasecIcon";
import CareerModal from "@/components/CareerModal";

type MatchLevel = 'Excelente' | 'Bom' | 'Atenção' | 'Refazer';

function getMatchLevel(matchCount: number): MatchLevel {
  if (matchCount >= 4) return 'Excelente';
  if (matchCount === 3) return 'Bom';
  if (matchCount === 2) return 'Atenção';
  return 'Refazer';
}

const matchLevelStyles: Record<MatchLevel, { bg: string; text: string }> = {
  Excelente: { bg: 'hsl(142, 71%, 45%)', text: '#fff' },
  Bom: { bg: 'hsl(217, 91%, 60%)', text: '#fff' },
  Atenção: { bg: 'hsl(47, 96%, 53%)', text: '#000' },
  Refazer: { bg: 'hsl(0, 84%, 60%)', text: '#fff' },
};

interface CareersTabProps {
  answers: Record<number, 'yes' | 'no'>;
  sessionQuestions: Question[];
}

const CareersTab = ({ answers, sessionQuestions }: CareersTabProps) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { rankedCareers, allSubtypeCounts } = useMemo(() => {
    // 1. Compute all subtype counts (no type filter)
    const allSubtypeCounts = computeSubtypeCounts(sessionQuestions, answers);

    // 2. Build recency map: for each subtype, track the latest question index that contributed
    const subtypeRecency: Record<string, number> = {};
    for (let i = 0; i < sessionQuestions.length; i++) {
      const q = sessionQuestions[i];
      const ans = answers[q.id];
      if (!ans) continue;
      const sub = ans === 'yes' ? q.yesSub : q.noSub;
      if (sub) {
        subtypeRecency[sub] = i; // later index = more recent
      }
    }

    // 3. Get top 4 subtypes by count, tie-break by recency (higher index = more recent wins)
    const sortedSubtypes = Object.entries(allSubtypeCounts)
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return (subtypeRecency[b[0]] || 0) - (subtypeRecency[a[0]] || 0);
      });
    const playerTopSubtypes = new Set(sortedSubtypes.slice(0, 4).map(([name]) => name));

    // 4. Score each career
    const scored = careerDetails.map((career, idx) => {
      const careerSubLabels = career.relatedSubtypes.map((s) => s.label);
      const matchCount = careerSubLabels.filter((label) => playerTopSubtypes.has(label)).length;
      const subtypeSum = careerSubLabels.reduce((sum, label) => sum + (allSubtypeCounts[label] || 0), 0);
      return { career, matchCount, subtypeSum, idx };
    });

    // 5. Sort: matchCount desc, subtypeSum desc, idx asc
    scored.sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      if (b.subtypeSum !== a.subtypeSum) return b.subtypeSum - a.subtypeSum;
      return a.idx - b.idx;
    });

    // 6. Deduplicate by career name (keep first occurrence)
    const seen = new Set<string>();
    const unique = scored.filter((s) => {
      const key = s.career.name + '_' + s.career.type;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return { rankedCareers: unique.slice(0, 6), allSubtypeCounts };
  }, [answers, sessionQuestions]);

  return (
    <div className="space-y-[30px] animate-fade-in-up-delay">
      {rankedCareers.map(({ career, matchCount }) => {
        const level = getMatchLevel(matchCount);
        const levelStyle = matchLevelStyles[level];

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
              {/* Header: Title + Match seal */}
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

      <CareerModal
        career={selectedCareer}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default CareersTab;
