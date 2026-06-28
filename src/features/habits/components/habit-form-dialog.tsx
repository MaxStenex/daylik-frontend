"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ApiError } from "@/lib/api";
import { useCreateHabit, useUpdateHabit, useHabits } from "../hooks/use-habits";
import { type Habit, type HabitPayload } from "../types";

const DAILY_XP_CAP = 1000;
const XP_MIN = 50;
const XP_MAX = 1000;
const XP_STEP = 50;

const fieldClass =
  "w-full rounded-[10px] border-[1.5px] px-3 py-2.5 text-sm font-medium outline-none transition-colors bg-[var(--bg-2)] border-border focus:border-coral focus:bg-surface";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.06em] text-text-2";

interface HabitFormDialogProps {
  open: boolean;
  onClose: () => void;
  habit?: Habit;
}

export const HabitFormDialog = ({
  open,
  onClose,
  habit,
}: HabitFormDialogProps) => {
  const isEdit = !!habit;

  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [expReward, setExpReward] = useState(300);

  const { data: habits = [] } = useHabits();
  const createMutation = useCreateHabit();
  const updateMutation = useUpdateHabit();
  const activeMutation = isEdit ? updateMutation : createMutation;
  const isPending = activeMutation.isPending;
  const error = activeMutation.error;

  useEffect(() => {
    if (!open) return;
    setName(habit?.name ?? "");
    setTarget(habit?.daily_target ? String(habit.daily_target) : "");
    setUnit(habit?.unit ?? "");
    setExpReward(habit?.exp_reward ?? 300);
    createMutation.reset();
    updateMutation.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, habit?.id]);

  // Editing a habit excludes its own reward from the budget so the meter
  // reflects the pending change, mirroring the design.
  const usedXp = habits.reduce(
    (sum, h) => sum + (habit && h.id === habit.id ? 0 : h.exp_reward),
    0,
  );
  const remaining = Math.max(DAILY_XP_CAP - usedXp, 0);
  const totalAfter = usedXp + expReward;
  const over = totalAfter > DAILY_XP_CAP;

  const targetNum = Number(target);
  const valid =
    !!name.trim() && !!unit.trim() && Number.isFinite(targetNum) && targetNum > 0;

  const handleSubmit = () => {
    if (!valid) return;
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
      <DialogContent className="border-border bg-surface sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-bold tracking-[-0.02em] text-foreground">
            {isEdit ? "Edit habit" : "Create a new habit"}
          </DialogTitle>
          <DialogDescription className="text-[13px]" style={{ color: "var(--text-3)" }}>
            {isEdit
              ? `Update “${habit?.name}” — your stats and streak stay intact.`
              : `You have ${remaining} XP/day left in your daily budget.`}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-1 flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className={labelClass}>Habit name</label>
            <input
              className={fieldClass}
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Target + unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Daily target</label>
              <input
                className={fieldClass}
                type="number"
                min={1}
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div>
              <label className={labelClass}>Unit</label>
              <input
                className={fieldClass}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
          </div>

          {/* XP reward + budget */}
          <div>
            <label className={labelClass}>Daily EXP reward</label>
            <Slider
              min={XP_MIN}
              max={XP_MAX}
              step={XP_STEP}
              // "center" avoids base-ui's inset prehydration <script>, which
              // warns when the slider mounts client-side inside this dialog.
              thumbAlignment="center"
              value={[expReward]}
              onValueChange={(vals) => {
                const v = Array.isArray(vals) ? vals[0] : vals;
                if (typeof v === "number") setExpReward(v);
              }}
              className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
            />
            <div
              className="mt-3 flex items-center gap-3 rounded-xl px-3.5 py-3"
              style={{
                background: over ? "var(--coral-soft)" : "var(--violet-soft)",
              }}
            >
              <span className="text-lg leading-none">{over ? "⚠️" : "⚡"}</span>
              <div className="flex-1">
                <div
                  className="mb-1.5 text-xs font-semibold"
                  style={{ color: over ? "var(--coral)" : "var(--text-2)" }}
                >
                  {over
                    ? `Over the daily ${DAILY_XP_CAP} XP cap!`
                    : `Daily XP budget: ${totalAfter} / ${DAILY_XP_CAP}`}
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full"
                  style={{ background: "oklch(1 0 0 / 0.4)" }}
                >
                  <div
                    className="h-full rounded-full transition-[width] duration-200"
                    style={{
                      width: `${Math.min((totalAfter / DAILY_XP_CAP) * 100, 100)}%`,
                      background: over ? "var(--coral)" : "var(--violet)",
                    }}
                  />
                </div>
              </div>
              <span className="mono shrink-0 text-xs font-bold whitespace-nowrap">
                +{expReward} XP/day
              </span>
            </div>
          </div>

          {error && (
            <p className="text-xs text-danger">
              {error instanceof ApiError ? error.error : "Something went wrong"}
            </p>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!valid || isPending}
            className="w-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
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
