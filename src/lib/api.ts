import { useAuthStore } from "@/features/auth/store/auth-store";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly error: string,
  ) {
    super(error);
    this.name = "ApiError";
  }
}

const getAccessToken = (): string | null =>
  useAuthStore.getState().accessToken;

const setAccessToken = (token: string | null): void => {
  useAuthStore.getState().setAccessToken(token);
};

let refreshPromise: Promise<boolean> | null = null;

const performRefresh = async (): Promise<boolean> => {
  try {
    const res = await fetch("/api/v1/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      setAccessToken(null);
      return false;
    }
    const tokens = (await res.json()) as { access_token: string };
    setAccessToken(tokens.access_token);
    return true;
  } catch {
    setAccessToken(null);
    return false;
  }
};

const ensureRefresh = (): Promise<boolean> => {
  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

export const bootstrapSession = (): Promise<boolean> => ensureRefresh();

const buildHeaders = (init: HeadersInit | undefined): Headers => {
  const headers = new Headers(init);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return headers;
};

const parseResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new ApiError(res.status, body.error || res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
};

export const apiRequest = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const send = () =>
    fetch(path, {
      ...options,
      credentials: "include",
      headers: buildHeaders(options.headers),
    });

  let res = await send();
  if (res.status === 401) {
    const ok = await ensureRefresh();
    if (ok) res = await send();
  }
  return parseResponse<T>(res);
};
