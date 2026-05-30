"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createHabitLogApi,
  deleteHabitLogApi,
} from "../api/habits-log-api";
import type { CreateHabitLogPayload } from "../types";

export const useCreateHabitLog = () =>
  useMutation({
    mutationFn: (payload: CreateHabitLogPayload) => createHabitLogApi(payload),
  });

export const useDeleteHabitLog = () =>
  useMutation({
    mutationFn: (id: string) => deleteHabitLogApi(id),
  });
