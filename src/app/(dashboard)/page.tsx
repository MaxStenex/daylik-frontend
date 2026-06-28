"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";
import {
  HabitFormDialog,
  HabitDetailModal,
  DeleteConfirmDialog,
  LogProgressDialog,
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [logId, setLogId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Derive habits from the live list so they vanish from open panels/dialogs
  // once a habit is deleted (query invalidation refetches `habits`).
  const byId = (id: string | null) =>
    id ? (habits.find((h) => h.id === id) ?? null) : null;
  const selectedHabit = byId(selectedId);
  const logHabit = byId(logId);
  const editHabit = byId(editId);
  const deleteHabit = byId(deleteId);

  const contribCells = useMemo(() => buildStubContribCells(), []);

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
        <TodaySection
          habits={habits}
          onOpenHabit={(h) => setSelectedId(h.id)}
          onLogHabit={(h) => setLogId(h.id)}
        />
      )}

      {/* Stats */}
      <StatsRow
        progression={STUB_PROGRESSION}
        achievementsEarned={earnedAchievements.length}
        achievementsTotal={STUB_ACHIEVEMENTS.length}
      />

      {/* Contribution grid */}
      <ContribCard cells={contribCells} />

      {/* Achievements preview */}
      <AchievementStrip items={earnedAchievements.slice(0, 4)} />

      {/* Habit detail modal */}
      <HabitDetailModal
        habit={selectedHabit}
        open={!!selectedHabit}
        onClose={() => setSelectedId(null)}
        onEdit={(h) => {
          setSelectedId(null);
          setEditId(h.id);
        }}
        onDelete={(h) => {
          setSelectedId(null);
          setDeleteId(h.id);
        }}
        onLog={(h) => {
          setSelectedId(null);
          setLogId(h.id);
        }}
      />

      {/* Create / edit habit dialogs */}
      <HabitFormDialog open={createOpen} onClose={() => setCreateOpen(false)} />
      <HabitFormDialog
        open={!!editHabit}
        habit={editHabit ?? undefined}
        onClose={() => setEditId(null)}
      />

      {/* Log progress + delete confirmation */}
      <LogProgressDialog
        open={!!logHabit}
        habit={logHabit}
        onClose={() => setLogId(null)}
      />
      <DeleteConfirmDialog
        open={!!deleteHabit}
        habit={deleteHabit}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}
