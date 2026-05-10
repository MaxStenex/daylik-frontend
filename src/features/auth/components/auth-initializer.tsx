"use client";

import { useEffect } from "react";
import { bootstrapSession } from "@/lib/api";
import { useAuthStore } from "../store/auth-store";

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setHydrated = useAuthStore((s) => s.setHydrated);

  useEffect(() => {
    bootstrapSession().finally(() => setHydrated());
  }, [setHydrated]);

  return <>{children}</>;
};
