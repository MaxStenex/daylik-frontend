"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";
import { useCreateHabitLog } from "../hooks/use-habit-logs";
import { type Habit } from "../types";

interface LogProgressDialogProps {
  open: boolean;
  habit: Habit | null;
  onClose: () => void;
}

export const LogProgressDialog = ({
  open,
  habit,
  onClose,
}: LogProgressDialogProps) => {
  const [value, setValue] = useState("");
  const { mutate, isPending, error, reset } = useCreateHabitLog();

  // Prefill only with what's already logged today; otherwise leave it empty.
  useEffect(() => {
    if (!open || !habit) return;
    setValue(habit.today_log ? String(habit.today_log.completed_count) : "");
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, habit?.id]);

  const handleSubmit = () => {
    if (!habit) return;
    const count = Math.round(Number(value));
    if (!Number.isFinite(count) || count < 0) return;
    mutate(
      { habit_id: habit.id, completed_count: count },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-surface border-border-2 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg font-extrabold text-foreground">
            Log progress
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 mt-2">
          <p className="text-sm text-text-2">
            How much did you complete for{" "}
            <span className="font-bold text-foreground">{habit?.name}</span>{" "}
            today?
          </p>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-2 tracking-widest uppercase">
              Completed
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                value={value}
                autoFocus
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="bg-surface border-border-2 text-foreground placeholder:text-text-3 focus-visible:ring-primary"
              />
              <span className="text-sm text-text-2 shrink-0">
                / {habit?.daily_target} {habit?.unit}
              </span>
            </div>
          </div>

          {error && (
            <p className="text-xs text-danger">
              {error instanceof ApiError ? error.error : "Failed to log progress"}
            </p>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            {isPending ? "Logging…" : "Log progress"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
