"use client";

import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";
import { useDeleteHabit } from "../hooks/use-habits";
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
  const { mutate, isPending, error, reset } = useDeleteHabit();

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleDelete = () => {
    if (!habit) return;
    mutate(habit.id, { onSuccess: () => handleClose() });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
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

          {error && (
            <p className="text-xs text-danger">
              {error instanceof ApiError ? error.error : "Failed to delete habit"}
            </p>
          )}

          {/* Actions */}
          <div className="w-full flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full border-border bg-surface-2 text-text-2 hover:bg-surface-3 hover:text-foreground font-bold"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              className="w-full bg-danger/15 hover:bg-danger/25 text-danger border border-danger/30 font-bold"
              variant="ghost"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting…" : "Delete permanently"}
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
