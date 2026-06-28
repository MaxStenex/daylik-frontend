"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHabitApi,
  deleteHabitApi,
  listHabitsApi,
  updateHabitApi,
} from "../api/habits-api";
import type { HabitPayload } from "../types";

export const HABITS_KEY = ["habits"] as const;

export const useHabits = () =>
  useQuery({
    queryKey: HABITS_KEY,
    queryFn: listHabitsApi,
    select: (data) => data.habits,
  });

export const useCreateHabit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: HabitPayload) => createHabitApi(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: HABITS_KEY }),
  });
};

export const useUpdateHabit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: HabitPayload }) =>
      updateHabitApi(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: HABITS_KEY }),
  });
};

export const useDeleteHabit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteHabitApi(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: HABITS_KEY }),
  });
};
