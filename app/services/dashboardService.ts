import api from "@/lib/api"

export interface UserGrowth {
  month: string
  users: number
}

export interface LoginActivity {
  date: string
  logins: number
}

export interface DashboardStats {
  totalUsers: number
  activeSessions: number
  totalLogins: number
  totalProjects: number
  userGrowth: UserGrowth[]
  loginActivity: LoginActivity[]
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get("/api/dashboard/stats")
    return response.data
  },
}