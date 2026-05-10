import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isHydrated: boolean;
}

interface AuthActions {
  setAccessToken: (token: string | null) => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  accessToken: null,
  isHydrated: false,
  setAccessToken: (accessToken) => set({ accessToken }),
  setHydrated: () => set({ isHydrated: true }),
}));

export const useIsAuthenticated = (): boolean =>
  useAuthStore((s) => s.accessToken !== null);
