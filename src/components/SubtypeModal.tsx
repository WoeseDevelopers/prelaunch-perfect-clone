import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { riasecProfiles, type RiasecType } from "@/data/quizQuestions";
import RiasecIcon from "@/components/RiasecIcon";

interface SubtypeModalProps {
  riasecType: RiasecType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subtypeScores: Record<string, number>;
}

const SubtypeModal = ({ riasecType, open, onOpenChange, subtypeScores }: SubtypeModalProps) => {
  if (!riasecType) return null;

  const profile = riasecProfiles[riasecType];
  const totalScore = profile.subdivisions.reduce((sum, sub) => sum + (subtypeScores[sub] || 0), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden gap-0 border-t-4" style={{ borderTopColor: profile.color }}>
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: profile.color }}
          >
            <RiasecIcon name={profile.icon} size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <DialogTitle className="text-xl font-extrabold text-foreground">
              {profile.name}
            </DialogTitle>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Tipo {riasecType}
            </p>
          </div>
          <div
            className="rounded-full px-3 py-1 text-sm font-extrabold text-white"
            style={{ backgroundColor: profile.color, fontFamily: "'Syne', sans-serif" }}
          >
            {String(totalScore).padStart(2, '0')}
          </div>
        </div>

        <div className="px-6 pb-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {profile.description}
          </p>
        </div>

        <div className="px-6 pb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Subtipos
          </p>
          <div className="flex flex-wrap gap-1.5">
            {profile.subdivisions.map((sub) => {
              const count = subtypeScores[sub] || 0;
              return (
                <span
                  key={sub}
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5"
                  style={{
                    backgroundColor: count > 0 ? profile.color : 'transparent',
                    color: count > 0 ? 'white' : 'hsl(var(--muted-foreground))',
                    border: count > 0 ? 'none' : '1px solid hsl(var(--border))',
                  }}
                >
                  {sub}
                  {count > 0 && (
                    <span className="bg-white/30 rounded-full w-4 h-4 flex items-center justify-center text-[9px]">
                      {count}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubtypeModal;
