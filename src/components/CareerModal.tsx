import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { riasecProfiles, type RiasecType } from "@/data/quizQuestions";
import type { CareerDetail } from "@/data/careerDetails";
import RiasecIcon from "@/components/RiasecIcon";

interface CareerModalProps {
  career: CareerDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CareerModal = ({ career, open, onOpenChange }: CareerModalProps) => {
  const [expandedType, setExpandedType] = useState<RiasecType | null>(null);

  if (!career) return null;

  const profile = riasecProfiles[career.type];

  const handleOpenChange = (val: boolean) => {
    if (!val) setExpandedType(null);
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm rounded-3xl p-5 overflow-hidden gap-0 border-0 bg-card">
        <div className="rounded-2xl border border-border overflow-hidden bg-card">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <DialogTitle className="text-2xl font-extrabold text-foreground leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            {career.name}
          </DialogTitle>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            {career.description}
          </p>
        </div>

        {/* Strengths */}
        <div className="mx-6 rounded-xl overflow-hidden border border-border/50 mb-3">
          <div className="px-4 py-2 border-l-4" style={{ borderLeftColor: 'hsl(142, 71%, 45%)' }}>
            <p className="text-xs font-bold text-foreground mb-1">Ponto forte</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {career.strengths}
            </p>
          </div>
        </div>

        {/* Weaknesses */}
        <div className="mx-6 rounded-xl overflow-hidden border border-border/50 mb-5">
          <div className="px-4 py-2 border-l-4" style={{ borderLeftColor: 'hsl(0, 84%, 60%)' }}>
            <p className="text-xs font-bold text-foreground mb-1">Ponto fraco</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {career.weaknesses}
            </p>
          </div>
        </div>

        {/* Related subtypes - clickable to expand inline */}
        {/* Icons row - always horizontal at bottom */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-center gap-5">
            {career.relatedSubtypes.map((sub) => {
              const subProfile = riasecProfiles[sub.type];
              const isExpanded = expandedType === sub.type;
              return (
                <button
                  key={sub.label}
                  className={`flex flex-col items-center gap-1.5 cursor-pointer transition-transform ${isExpanded ? 'scale-110' : 'hover:scale-110'}`}
                  onClick={() => setExpandedType(isExpanded ? null : sub.type)}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: subProfile.color }}
                  >
                    <RiasecIcon name={subProfile.icon} size={22} className="text-white" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground text-center max-w-[70px] leading-tight">
                    {sub.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Collapsible section below icons */}
          {expandedType && (() => {
            const ep = riasecProfiles[expandedType];
            return (
              <div className="mt-4 rounded-xl border border-border overflow-hidden animate-fade-in-up">
                <div className="px-4 pt-4 pb-3 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: ep.color }}
                  >
                    <RiasecIcon name={ep.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-foreground">{ep.name}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      Tipo {expandedType}
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">{ep.description}</p>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Subtipos
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ep.subdivisions.map((s) => (
                      <span
                        key={s}
                        className="rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-white"
                        style={{ backgroundColor: ep.color }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CareerModal;
