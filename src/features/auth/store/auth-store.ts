import { create } from "zustand";
import type { AuthUser, TokenPair } from "../types";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
}

interface AuthActions {
  setAuth: (user: AuthUser, tokens: TokenPair) => void;
  setTokens: (tokens: TokenPair) => void;
  clearAuth: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isHydrated: false,
  setAuth: (user, tokens) =>
    set({
      user,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    }),
  setTokens: (tokens) =>
    set({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    }),
  clearAuth: () => set({ user: null, accessToken: null, refreshToken: null }),
  setHydrated: () => set({ isHydrated: true }),
}));
