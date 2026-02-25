import { create } from "zustand"
import { persist } from "zustand/middleware"
import { authApi, LoginData, RegisterData } from "@/lib/auth"
import { appToast } from "@/lib/toast"
import { saveTokens, clearTokens } from "@/lib/api"

interface User {
  email: string
  firstName: string
  lastName: string
  role: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  register: (data: RegisterData) => Promise<void>
  login: (data: LoginData, remember?: boolean) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      register: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authApi.register(data)
          if (!response?.accessToken || !response?.refreshToken) {
            throw new Error("Reponse d'inscription invalide")
          }
          saveTokens(response.accessToken, response.refreshToken, false)
          set({
            user: {
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              role: response.role,
            },
            isAuthenticated: true,
            isLoading: false,
          })
          appToast.success("Compte créé avec succès", `Bienvenue, ${response.firstName}.`)
        } catch (error: any) {
          const message = error.response?.data?.message || error?.message || "Erreur lors de l'inscription"
          set({ error: message, isLoading: false })
          appToast.error("Inscription échouée", message)
          throw error
        }
      },

      login: async (data, remember = false) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authApi.login(data)
          if (!response?.accessToken || !response?.refreshToken) {
            throw new Error("Reponse de connexion invalide")
          }
          saveTokens(response.accessToken, response.refreshToken, remember)
          set({
            user: {
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              role: response.role,
            },
            isAuthenticated: true,
            isLoading: false,
          })
          appToast.success("Connexion réussie", `Bon retour, ${response.firstName}.`)
        } catch (error: any) {
          const message = error.response?.data?.message || error?.message || "Email ou mot de passe incorrect"
          set({ error: message, isLoading: false })
          appToast.error("Connexion échouée", message)
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await authApi.logout()
          appToast.info("Déconnexion réussie", "À bientôt sur SecureVault.")
        } finally {
          clearTokens()
          set({ user: null, isAuthenticated: false, isLoading: false })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
