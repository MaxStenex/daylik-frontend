"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";
import {
  HabitFormDialog,
  LevelCard,
  StreakCard,
  TodaySection,
  StatsRow,
  ContribCard,
  AchievementStrip,
  useHabits,
} from "@/features/habits";
import { STUB_PROGRESSION } from "@/features/habits/types";
import {
  STUB_ACHIEVEMENTS,
  buildStubContribCells,
} from "@/features/habits/lib/habit-display";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const getFormattedDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default function HomePage() {
  const { data: habits = [], isLoading, error } = useHabits();
  const [createOpen, setCreateOpen] = useState(false);

  const contribCells = useMemo(() => buildStubContribCells(18), []);

  const earnedAchievements = STUB_ACHIEVEMENTS.filter((a) => a.earned);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 pt-10 pb-20">
      {/* Header */}
      <header className="flex items-end justify-between gap-6 mb-7">
        <div>
          <h1 className="text-[32px] font-bold tracking-[-0.025em] leading-tight">
            {getGreeting()}, Maxim <span className="inline-block">👋</span>
          </h1>
          <p className="text-[14px] mt-1" style={{ color: "var(--text-3)" }}>
            {getFormattedDate()}
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="gap-2 font-semibold"
          style={{
            background: "var(--coral)",
            color: "white",
            boxShadow: "0 2px 8px oklch(0.68 0.16 35 / 0.3)",
          }}
        >
          <Plus size={16} />
          New habit
        </Button>
      </header>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 mb-4">
        <LevelCard progression={STUB_PROGRESSION} />
        <StreakCard progression={STUB_PROGRESSION} freezesLeft={1} />
      </div>

      {/* Today */}
      {isLoading ? (
        <p
          className="text-sm py-6 text-center"
          style={{ color: "var(--text-3)" }}
        >
          Loading habits…
        </p>
      ) : error ? (
        <p
          className="text-sm py-6 text-center"
          style={{ color: "var(--rose)" }}
        >
          {error instanceof ApiError ? error.error : "Failed to load habits"}
        </p>
      ) : (
        <TodaySection habits={habits} />
      )}

      {/* Stats */}
      <StatsRow
        progression={STUB_PROGRESSION}
        achievementsEarned={earnedAchievements.length}
        achievementsTotal={STUB_ACHIEVEMENTS.length}
      />

      {/* Contribution grid */}
      <ContribCard cells={contribCells} weeks={18} />

      {/* Achievements preview */}
      <AchievementStrip items={earnedAchievements.slice(0, 4)} />

      {/* Create habit dialog (existing, unstyled — phase 5 redesigns it) */}
      <HabitFormDialog open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
