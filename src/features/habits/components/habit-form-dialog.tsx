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
import { Slider } from "@/components/ui/slider";
import { ApiError } from "@/lib/api";
import { useCreateHabit, useUpdateHabit } from "../hooks/use-habits";
import { type Habit, type HabitPayload } from "../types";

interface HabitFormDialogProps {
  open: boolean;
  onClose: () => void;
  habit?: Habit;
}

export const HabitFormDialog = ({ open, onClose, habit }: HabitFormDialogProps) => {
  const isEdit = !!habit;

  const [name, setName] = useState(habit?.name ?? "");
  const [target, setTarget] = useState(String(habit?.daily_target ?? ""));
  const [unit, setUnit] = useState(habit?.unit ?? "");
  const [expReward, setExpReward] = useState(habit?.exp_reward ?? 150);

  const createMutation = useCreateHabit();
  const updateMutation = useUpdateHabit();
  const activeMutation = isEdit ? updateMutation : createMutation;
  const isPending = activeMutation.isPending;
  const error = activeMutation.error;

  useEffect(() => {
    if (!open) return;
    setName(habit?.name ?? "");
    setTarget(String(habit?.daily_target ?? ""));
    setUnit(habit?.unit ?? "");
    setExpReward(habit?.exp_reward ?? 150);
    createMutation.reset();
    updateMutation.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, habit?.id]);

  const handleSubmit = () => {
    const targetNum = Number(target);
    if (!name.trim() || !unit.trim() || !Number.isFinite(targetNum) || targetNum <= 0) {
      return;
    }
    const payload: HabitPayload = {
      name: name.trim(),
      exp_reward: expReward,
      daily_target: targetNum,
      unit: unit.trim(),
    };

    if (isEdit && habit) {
      updateMutation.mutate(
        { id: habit.id, payload },
        { onSuccess: () => onClose() },
      );
    } else {
      createMutation.mutate(payload, { onSuccess: () => onClose() });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-surface border-border-2 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-extrabold text-foreground">
            {isEdit ? "Edit habit" : "New habit"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 mt-2">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-2 tracking-widest uppercase">
              Habit name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Run 5 km"
              className="bg-surface border-border-2 text-foreground placeholder:text-text-3 focus-visible:ring-primary"
            />
          </div>

          {/* Daily target */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-2 tracking-widest uppercase">
              Daily target
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="5"
                className="bg-surface border-border-2 text-foreground placeholder:text-text-3 focus-visible:ring-primary"
              />
              <Input
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="km"
                className="w-24 shrink-0 bg-surface border-border-2 text-foreground placeholder:text-text-3 focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* EXP reward */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-text-2 tracking-widest uppercase">
                EXP reward
              </label>
              <span className="text-sm font-bold text-primary">
                {expReward} XP
              </span>
            </div>
            <Slider
              min={50}
              max={600}
              step={50}
              value={[expReward]}
              onValueChange={(vals) => {
                const v = Array.isArray(vals) ? vals[0] : vals;
                if (typeof v === "number") setExpReward(v);
              }}
              className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
            />
            <div className="flex justify-between">
              <span className="text-[10px] text-text-3">50 XP</span>
              <span className="text-[10px] text-text-3">600 XP</span>
            </div>
          </div>

          {error && (
            <p className="text-xs text-danger">
              {error instanceof ApiError ? error.error : "Something went wrong"}
            </p>
          )}

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            {isPending
              ? isEdit
                ? "Saving…"
                : "Creating…"
              : isEdit
                ? "Save changes"
                : "Create habit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
