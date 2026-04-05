"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HabitList,
  HabitFormDialog,
  HabitDetailPanel,
  DeleteConfirmDialog,
  ProgressionHero,
  type Habit,
} from "@/features/habits";
import {
  STUB_HABITS,
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
  const [habits] = useState<Habit[]>(STUB_HABITS);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editHabit, setEditHabit] = useState<Habit | null>(null);
  const [deleteHabit, setDeleteHabit] = useState<Habit | null>(null);

  const handleSelect = (habit: Habit) => setSelectedHabit(habit);
  const handleClosePanel = () => setSelectedHabit(null);

  const handleEdit = (habit: Habit) => {
    setEditHabit(habit);
  };

  const handleDelete = (habit: Habit) => {
    setDeleteHabit(habit);
    setSelectedHabit(null);
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
          <HabitList
            habits={habits}
            todayProgress={STUB_TODAY_PROGRESS}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
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
