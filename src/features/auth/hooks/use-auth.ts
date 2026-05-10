"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginApi, logoutApi, registerApi } from "../api/auth-api";
import { useAuthStore } from "../store/auth-store";
import type { LoginPayload, RegisterPayload } from "../types";

export const useLogin = () => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: ({ access_token }) => {
      setAccessToken(access_token);
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
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  return useMutation({
    mutationFn: () => logoutApi(),
    onSettled: () => {
      setAccessToken(null);
    },
  });
};
