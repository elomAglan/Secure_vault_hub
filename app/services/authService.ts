import api from "@/lib/api"

export const authService = {
  forgotPassword: async (email: string): Promise<void> => {
    await api.post("/api/auth/password/forgot", { email })
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await api.post("/api/auth/password/reset", { token, newPassword })
  },
}