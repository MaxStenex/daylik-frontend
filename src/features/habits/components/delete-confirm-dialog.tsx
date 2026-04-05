"use client";

import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type Habit } from "../types";

interface DeleteConfirmDialogProps {
  open: boolean;
  habit: Habit | null;
  onClose: () => void;
}

export const DeleteConfirmDialog = ({
  open,
  habit,
  onClose,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-surface border-border-2 max-w-sm">
        <div className="flex flex-col items-center text-center gap-3">
          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-danger/12 border border-danger/20 flex items-center justify-center">
            <Trash2 size={22} className="text-danger" />
          </div>

          <div>
            <h2 className="text-base font-extrabold text-foreground mb-1.5">
              Delete habit?
            </h2>
            <p className="text-xs text-text-2 leading-relaxed">
              <span className="font-medium text-primary">
                &ldquo;{habit?.name}&rdquo;
              </span>{" "}
              and all its log history will be permanently deleted. This can&apos;t be undone.
            </p>
          </div>

          {/* Archive suggestion */}
          <div className="w-full rounded-xl bg-accent-3/8 border border-accent-3/20 px-3 py-2.5 text-left">
            <p className="text-[10px] font-bold text-accent-3 mb-1">
              Archive instead?
            </p>
            <p className="text-[10px] text-text-2 leading-relaxed">
              Archiving keeps all history and EXP — you can restore the habit anytime.
            </p>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full border-border bg-surface-2 text-text-2 hover:bg-surface-3 hover:text-foreground font-bold"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="w-full bg-danger/15 hover:bg-danger/25 text-danger border border-danger/30 font-bold"
              variant="ghost"
            >
              Delete permanently
            </Button>
          </div>

          <p className="text-[10px] text-text-3 leading-relaxed">
            Your EXP and streak won&apos;t be affected by deleting a habit.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
