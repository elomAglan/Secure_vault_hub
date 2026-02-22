import api from "./api";
import { saveTokens, clearTokens } from "./api";
import axios from "axios";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
  remember?: boolean; // 👈 pour choisir local ou session
}

export const authApi = {
  async register(
    data: RegisterData & { remember?: boolean }
  ): Promise<AuthResponse> {
    const { remember = true, ...payload } = data;

    const response = await api.post<AuthResponse>(
      "/api/auth/register",
      payload
    );

    saveTokens(
      response.data.accessToken,
      response.data.refreshToken,
      remember
    );

    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const { remember = true, ...payload } = data;

    const response = await api.post<AuthResponse>(
      "/api/auth/login",
      payload
    );

    saveTokens(
      response.data.accessToken,
      response.data.refreshToken,
      remember
    );

    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      // If token/session is already invalid, logout should still succeed client-side.
      if (axios.isAxiosError(error) && [401, 403].includes(error.response?.status ?? 0)) {
        return;
      }
      throw error;
    } finally {
      clearTokens();
    }
  },
};
