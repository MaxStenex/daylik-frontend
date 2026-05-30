import { apiRequest } from "@/lib/api";
import type { CreateHabitLogPayload, HabitLog } from "../types";

export const createHabitLogApi = (
  payload: CreateHabitLogPayload,
): Promise<HabitLog> =>
  apiRequest<HabitLog>("/api/v1/habits-log", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const deleteHabitLogApi = (id: string): Promise<void> =>
  apiRequest<void>(`/api/v1/habits-log/${id}`, {
    method: "DELETE",
  });
