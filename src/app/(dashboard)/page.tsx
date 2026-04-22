"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";
import {
  HabitList,
  HabitFormDialog,
  HabitDetailPanel,
  DeleteConfirmDialog,
  ProgressionHero,
  useHabits,
  type Habit,
} from "@/features/habits";
import {
  STUB_PROGRESSION,
  STUB_TODAY_PROGRESS,
} from "@/features/habits/types";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const getFormattedDate = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function HomePage() {
  const { data: habits = [], isLoading, error } = useHabits();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editHabit, setEditHabit] = useState<Habit | null>(null);
  const [deleteHabit, setDeleteHabit] = useState<Habit | null>(null);

  // Derive the selected habit from the latest list so a refetch (or delete) drops it cleanly.
  const selectedHabit = selectedId
    ? (habits.find((h) => h.id === selectedId) ?? null)
    : null;

  const handleSelect = (habit: Habit) => setSelectedId(habit.id);
  const handleClosePanel = () => setSelectedId(null);

  const handleEdit = (habit: Habit) => {
    setEditHabit(habit);
  };

  const handleDelete = (habit: Habit) => {
    setDeleteHabit(habit);
    setSelectedId(null);
  };

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="px-6 py-7">
          {/* Page header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground">
                {getGreeting()}, Maxim
              </h1>
              <p className="text-base text-text-2 mt-0.5">{getFormattedDate()}</p>
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2"
              onClick={() => setCreateOpen(true)}
            >
              <Plus size={16} />
              New habit
            </Button>
          </div>

          {/* Progression hero */}
          <div className="mb-6">
            <ProgressionHero progression={STUB_PROGRESSION} />
          </div>

          {/* Habit list */}
          {isLoading ? (
            <p className="text-sm text-text-3 py-4 text-center">Loading habits…</p>
          ) : error ? (
            <p className="text-sm text-danger py-4 text-center">
              {error instanceof ApiError ? error.error : "Failed to load habits"}
            </p>
          ) : (
            <HabitList
              habits={habits}
              todayProgress={STUB_TODAY_PROGRESS}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>

      {/* Detail panel */}
      {selectedHabit && (
        <HabitDetailPanel
          habit={selectedHabit}
          onClose={handleClosePanel}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Dialogs */}
      <HabitFormDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
      <HabitFormDialog
        key={editHabit?.id ?? "edit"}
        open={!!editHabit}
        habit={editHabit ?? undefined}
        onClose={() => setEditHabit(null)}
      />
      <DeleteConfirmDialog
        open={!!deleteHabit}
        habit={deleteHabit}
        onClose={() => setDeleteHabit(null)}
      />
    </div>
  );
}
