const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const setTokenCookies = (access: string, refresh: string): void => {
  if (typeof window === "undefined") return;
  const flags = "Path=/; SameSite=Strict; Secure";
  document.cookie = `access_token=${encodeURIComponent(access)}; ${flags}`;
  document.cookie = `refresh_token=${encodeURIComponent(refresh)}; ${flags}`;
};

export const clearAuthCookies = (): void => {
  if (typeof window === "undefined") return;
  const flags = "Path=/; SameSite=Strict; Secure; Max-Age=0";
  document.cookie = `access_token=; ${flags}`;
  document.cookie = `refresh_token=; ${flags}`;
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly error: string,
  ) {
    super(error);
    this.name = "ApiError";
  }
}

// Singleton refresh promise to prevent concurrent refresh calls
let refreshPromise: Promise<void> | null = null;

const doRefresh = async (): Promise<void> => {
  const refreshToken = getCookie("refresh_token");
  if (!refreshToken) {
    clearAuthCookies();
    window.location.href = "/login";
    return;
  }

  const res = await fetch("/api/v1/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) {
    clearAuthCookies();
    window.location.href = "/login";
    return;
  }

  const tokens = await res.json();
  setTokenCookies(tokens.access_token, tokens.refresh_token);
};

export const apiRequest = async <T>(
  path: string,
  options: RequestInit & { skipAuth?: boolean } = {},
): Promise<T> => {
  const { skipAuth, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!skipAuth) {
    const token = getCookie("access_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(path, {
    ...fetchOptions,
    headers,
  });

  if (res.status === 401 && !skipAuth) {
    // Serialize concurrent refreshes into one call
    if (!refreshPromise) {
      refreshPromise = doRefresh().finally(() => {
        refreshPromise = null;
      });
    }
    await refreshPromise;

    // Retry with new token
    const newToken = getCookie("access_token");
    if (newToken) headers["Authorization"] = `Bearer ${newToken}`;

    const retry = await fetch(path, {
      ...fetchOptions,
      headers,
    });

    if (!retry.ok) {
      const body = await retry.json().catch(() => ({ error: retry.statusText }));
      throw new ApiError(retry.status, body.error ?? retry.statusText);
    }

    if (retry.status === 204) return undefined as T;
    return retry.json() as Promise<T>;
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new ApiError(res.status, body.error ?? res.statusText);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
};
