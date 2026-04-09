"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setTokens, setHydrated } = useAuthStore();

  useEffect(() => {
    const access = getCookie("access_token");
    const refresh = getCookie("refresh_token");
    if (access && refresh) {
      setTokens({ access_token: access, refresh_token: refresh });
    }
    setHydrated();
  }, [setTokens, setHydrated]);

  return <>{children}</>;
};
