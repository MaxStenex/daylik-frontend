import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HabitCategory, HabitDifficulty } from "../lib/habit-display";

const chipBase =
  "inline-flex items-center gap-1 text-[11px] font-semibold px-[9px] py-[3px] rounded-full border border-transparent";

const categoryVariants = cva(chipBase, {
  variants: {
    category: {
      health: "bg-mint-soft text-[oklch(0.4_0.13_165)] dark:text-[oklch(0.85_0.13_165)]",
      learning: "bg-sky-soft text-[oklch(0.42_0.13_235)] dark:text-[oklch(0.85_0.12_235)]",
      mindfulness:
        "bg-violet-soft text-[oklch(0.42_0.16_285)] dark:text-[oklch(0.85_0.13_285)]",
      productivity:
        "bg-amber-soft text-[oklch(0.4_0.13_70)] dark:text-[oklch(0.85_0.13_80)]",
    },
  },
});

const difficultyVariants = cva(chipBase, {
  variants: {
    difficulty: {
      easy: "bg-mint-soft-2 text-[oklch(0.35_0.13_165)] dark:text-[oklch(0.92_0.12_165)]",
      medium:
        "bg-amber-soft-2 text-[oklch(0.38_0.13_70)] dark:text-[oklch(0.92_0.12_80)]",
      hard: "bg-coral-soft-2 text-[oklch(0.42_0.17_30)] dark:text-[oklch(0.85_0.15_35)]",
    },
  },
});

const CATEGORY_LABEL: Record<HabitCategory, string> = {
  health: "Health",
  learning: "Learning",
  mindfulness: "Mindfulness",
  productivity: "Productivity",
};

const DIFFICULTY_LABEL: Record<HabitDifficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

interface CategoryChipProps extends VariantProps<typeof categoryVariants> {
  category: HabitCategory;
  className?: string;
}

export const CategoryChip = ({ category, className }: CategoryChipProps) => (
  <span className={cn(categoryVariants({ category }), className)}>
    {CATEGORY_LABEL[category]}
  </span>
);

interface DifficultyChipProps extends VariantProps<typeof difficultyVariants> {
  difficulty: HabitDifficulty;
  className?: string;
}

export const DifficultyChip = ({ difficulty, className }: DifficultyChipProps) => (
  <span className={cn(difficultyVariants({ difficulty }), className)}>
    {DIFFICULTY_LABEL[difficulty]}
  </span>
);
