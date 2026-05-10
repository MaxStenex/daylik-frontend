import { apiRequest } from "@/lib/api";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../types";

export const loginApi = (payload: LoginPayload): Promise<LoginResponse> =>
  apiRequest<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const registerApi = (
  payload: RegisterPayload,
): Promise<RegisterResponse> =>
  apiRequest<RegisterResponse>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const logoutApi = (): Promise<void> =>
  apiRequest<void>("/api/v1/auth/logout", { method: "POST" });
