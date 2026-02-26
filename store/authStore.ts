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
  setError: (message: string | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setError: (message) => set({ error: message }),
      clearError: () => set({ error: null }),

      register: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authApi.register(data)
          if (!response?.accessToken || !response?.refreshToken) {
            throw new Error("Réponse d'inscription invalide")
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
        } catch (err: any) {
          // Gestion plus complète des erreurs
          let message = "Erreur lors de l'inscription."
          if (err.response?.status === 400) message = err.response.data?.message || "Email déjà utilisé."
          else if (!err.response) message = "Impossible de contacter le serveur."
          else if (err.message) message = err.message

          set({ error: message, isLoading: false })
          appToast.error("Inscription échouée", message)
          throw err
        }
      },

      login: async (data, remember = false) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authApi.login(data)
          if (!response?.accessToken || !response?.refreshToken) {
            throw new Error("Réponse de connexion invalide")
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
        } catch (err: any) {
          let message = "Une erreur est survenue lors de la connexion."
          if (!err.response) {
            message = "Impossible de contacter le serveur."
          } else if (err.response.status === 401) {
            message = "Email ou mot de passe incorrect."
          } else if (err.response.status === 403) {
            message = "Compte désactivé. Contactez l'administrateur."
          } else if (err.response.data?.message) {
            message = err.response.data.message
          } else if (err.message) {
            message = err.message
          }

          set({ error: message, isLoading: false })
          appToast.error("Connexion échouée", message)
          throw err
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await authApi.logout()
          appToast.info("Déconnexion réussie", "À bientôt sur SecureVault.")
        } catch {
          // Ignore si le logout échoue côté back
        } finally {
          clearTokens()
          set({ user: null, isAuthenticated: false, isLoading: false })
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)