import { apiRequest } from "@/lib/api";
import type {
  CreateHabitLogPayload,
  HabitLog,
  ListHabitLogsResponse,
  UpdateHabitLogPayload,
} from "../types";

export const listHabitLogsApi = (
  habitId: string,
): Promise<ListHabitLogsResponse> =>
  apiRequest<ListHabitLogsResponse>(
    `/api/v1/habits-log?habit_id=${encodeURIComponent(habitId)}`,
  );

export const createHabitLogApi = (
  payload: CreateHabitLogPayload,
): Promise<HabitLog> =>
  apiRequest<HabitLog>("/api/v1/habits-log", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateHabitLogApi = (
  id: string,
  payload: UpdateHabitLogPayload,
): Promise<void> =>
  apiRequest<void>(`/api/v1/habits-log/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteHabitLogApi = (id: string): Promise<void> =>
  apiRequest<void>(`/api/v1/habits-log/${id}`, {
    method: "DELETE",
  });
