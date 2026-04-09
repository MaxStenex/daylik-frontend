import { apiRequest } from "@/lib/api";
import type {
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
  TokenPair,
} from "../types";

export const loginApi = (payload: LoginPayload): Promise<TokenPair> =>
  apiRequest<TokenPair>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuth: true,
  } as RequestInit & { skipAuth: boolean });

export const registerApi = (
  payload: RegisterPayload,
): Promise<RegisterResponse> =>
  apiRequest<RegisterResponse>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
    skipAuth: true,
  } as RequestInit & { skipAuth: boolean });

export const refreshApi = (refreshToken: string): Promise<TokenPair> =>
  apiRequest<TokenPair>("/api/v1/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
    skipAuth: true,
  } as RequestInit & { skipAuth: boolean });

export const logoutApi = (refreshToken: string): Promise<void> =>
  apiRequest<void>("/api/v1/auth/logout", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
