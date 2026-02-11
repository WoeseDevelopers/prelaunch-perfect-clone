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
}

const SubtypeModal = ({ riasecType, open, onOpenChange }: SubtypeModalProps) => {
  if (!riasecType) return null;

  const profile = riasecProfiles[riasecType];

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
          <div>
            <DialogTitle className="text-xl font-extrabold text-foreground">
              {profile.name}
            </DialogTitle>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Tipo {riasecType}
            </p>
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
            {profile.subdivisions.map((sub) => (
              <span
                key={sub}
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                style={{ backgroundColor: profile.color }}
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubtypeModal;
