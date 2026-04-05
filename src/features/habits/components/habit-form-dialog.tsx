"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  type Category,
  type Difficulty,
  type Habit,
  CATEGORY_LABELS,
  DIFFICULTY_STYLES,
} from "../types";

interface HabitFormDialogProps {
  open: boolean;
  onClose: () => void;
  habit?: Habit;
}

const CATEGORIES: Category[] = ["health", "learning", "mindfulness", "productivity"];
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

const CATEGORY_CHIP_STYLES: Record<Category, { selected: string; base: string }> = {
  health: {
    selected: "bg-accent-2/15 text-accent-2 border-accent-2/30",
    base: "text-text-2 border-border-2 bg-surface",
  },
  learning: {
    selected: "bg-primary/15 text-primary border-primary/30",
    base: "text-text-2 border-border-2 bg-surface",
  },
  mindfulness: {
    selected: "bg-accent-3/15 text-accent-3 border-accent-3/30",
    base: "text-text-2 border-border-2 bg-surface",
  },
  productivity: {
    selected: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    base: "text-text-2 border-border-2 bg-surface",
  },
};

export const HabitFormDialog = ({ open, onClose, habit }: HabitFormDialogProps) => {
  const isEdit = !!habit;

  const [name, setName] = useState(habit?.name ?? "");
  const [category, setCategory] = useState<Category>(habit?.category ?? "health");
  const [difficulty, setDifficulty] = useState<Difficulty>(habit?.difficulty ?? "easy");
  const [target, setTarget] = useState(String(habit?.daily_target ?? ""));
  const [unit, setUnit] = useState(habit?.unit ?? "");
  const [expReward, setExpReward] = useState(habit?.exp_reward ?? 150);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
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

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-2 tracking-widest uppercase">
              Category
            </label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => {
                const styles = CATEGORY_CHIP_STYLES[cat];
                const isSelected = category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer",
                      isSelected ? styles.selected : styles.base
                    )}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-2 tracking-widest uppercase">
              Difficulty
            </label>
            <div className="flex gap-2">
              {DIFFICULTIES.map((diff) => {
                const styles = DIFFICULTY_STYLES[diff];
                const isSelected = difficulty === diff;
                return (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer",
                      isSelected
                        ? styles.className
                        : "text-text-2 border-border-2 bg-surface"
                    )}
                  >
                    {styles.label}
                  </button>
                );
              })}
            </div>
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

          {/* Submit */}
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            {isEdit ? "Save changes" : "Create habit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
