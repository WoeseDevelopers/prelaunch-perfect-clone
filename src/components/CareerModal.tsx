import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { riasecProfiles, type RiasecType } from "@/data/quizQuestions";
import type { CareerDetail } from "@/data/careerDetails";
import RiasecIcon from "@/components/RiasecIcon";
import SubtypeModal from "@/components/SubtypeModal";

interface CareerModalProps {
  career: CareerDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CareerModal = ({ career, open, onOpenChange }: CareerModalProps) => {
  const [subtypeType, setSubtypeType] = useState<RiasecType | null>(null);
  const [subtypeOpen, setSubtypeOpen] = useState(false);

  if (!career) return null;

  const profile = riasecProfiles[career.type];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden gap-0 border-t-4" style={{ borderTopColor: profile.color }}>
          {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <DialogTitle className="text-2xl font-extrabold text-foreground leading-tight">
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

          {/* Related subtypes - clickable */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-center gap-5">
              {career.relatedSubtypes.map((sub) => {
                const subProfile = riasecProfiles[sub.type];
                return (
                  <button
                    key={sub.label}
                    className="flex flex-col items-center gap-1.5 cursor-pointer transition-transform hover:scale-110"
                    onClick={() => {
                      setSubtypeType(sub.type);
                      setSubtypeOpen(true);
                    }}
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
          </div>
        </DialogContent>
      </Dialog>

      <SubtypeModal
        riasecType={subtypeType}
        open={subtypeOpen}
        onOpenChange={setSubtypeOpen}
      />
    </>
  );
};

export default CareerModal;
