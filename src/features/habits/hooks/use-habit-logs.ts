"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHabitLogApi,
  deleteHabitLogApi,
  listHabitLogsApi,
  updateHabitLogApi,
} from "../api/habits-log-api";
import type {
  CreateHabitLogPayload,
  UpdateHabitLogPayload,
} from "../types";
import { HABITS_KEY } from "./use-habits";

const habitLogsKey = (habitId: string) => ["habit-logs", habitId] as const;

const byCreatedAtDesc = (a: { created_at: string }, b: { created_at: string }) =>
  new Date(b.created_at).getTime() - new Date(a.created_at).getTime();

/** Logs for a single habit, newest first. Disabled until a habitId is given. */
export const useHabitLogs = (habitId: string | null | undefined) =>
  useQuery({
    queryKey: habitLogsKey(habitId ?? ""),
    queryFn: () => listHabitLogsApi(habitId as string),
    enabled: !!habitId,
    select: (data) => [...data.logs].sort(byCreatedAtDesc),
  });

export const useCreateHabitLog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateHabitLogPayload) => createHabitLogApi(payload),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: habitLogsKey(variables.habit_id) });
      // today_log lives on the habits list — refresh it so the card/prefill update.
      qc.invalidateQueries({ queryKey: HABITS_KEY });
    },
  });
};

export const useUpdateHabitLog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      id: string;
      habitId: string;
      payload: UpdateHabitLogPayload;
    }) => updateHabitLogApi(vars.id, vars.payload),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: habitLogsKey(variables.habitId) });
      qc.invalidateQueries({ queryKey: HABITS_KEY });
    },
  });
};

export const useDeleteHabitLog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: string; habitId: string }) =>
      deleteHabitLogApi(vars.id),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: habitLogsKey(variables.habitId) });
      qc.invalidateQueries({ queryKey: HABITS_KEY });
    },
  });
};
