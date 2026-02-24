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
  remember?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export const authApi = {
  async register(data: RegisterData): Promise<AuthResponse> {
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
      // Token déjà invalide côté serveur — on logout quand même localement
      if (
        axios.isAxiosError(error) &&
        [401, 403].includes(error.response?.status ?? 0)
      ) {
        return;
      }
      throw error;
    } finally {
      clearTokens();
    }
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post("/api/auth/password/forgot", { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post("/api/auth/password/reset", { token, newPassword });
  },
}