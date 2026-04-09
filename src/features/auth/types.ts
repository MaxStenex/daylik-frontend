export interface AuthUser {
  id: string;
  email: string;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
}
