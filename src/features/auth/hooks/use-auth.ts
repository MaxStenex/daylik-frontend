"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { clearAuthCookies, setTokenCookies } from "@/lib/api";
import { loginApi, logoutApi, registerApi } from "../api/auth-api";
import { useAuthStore } from "../store/auth-store";
import type { LoginPayload, RegisterPayload } from "../types";

export const useLogin = () => {
  const { setTokens } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: (tokens) => {
      setTokenCookies(tokens.access_token, tokens.refresh_token);
      setTokens(tokens);
      router.push("/");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerApi(payload),
    onSuccess: () => {
      router.push("/login");
    },
  });
};

export const useLogout = () => {
  const { refreshToken, clearAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: () => logoutApi(refreshToken ?? ""),
    onSettled: () => {
      clearAuth();
      clearAuthCookies();
      router.push("/login");
    },
  });
};
