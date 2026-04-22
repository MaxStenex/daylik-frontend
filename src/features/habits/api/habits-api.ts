import { apiRequest } from "@/lib/api";
import type { Habit, HabitPayload, ListHabitsResponse } from "../types";

export const listHabitsApi = (): Promise<ListHabitsResponse> =>
  apiRequest<ListHabitsResponse>("/api/v1/habits");

export const createHabitApi = (payload: HabitPayload): Promise<Habit> =>
  apiRequest<Habit>("/api/v1/habits", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateHabitApi = (
  id: string,
  payload: HabitPayload,
): Promise<void> =>
  apiRequest<void>(`/api/v1/habits/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteHabitApi = (id: string): Promise<void> =>
  apiRequest<void>(`/api/v1/habits/${id}`, {
    method: "DELETE",
  });
