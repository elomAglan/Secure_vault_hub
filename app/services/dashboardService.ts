import api from '@/lib/api'

/* =========================================================
   TYPES
   ========================================================= */

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

/* =========================================================
   SERVICE (plus robuste + typé + perf)
   ========================================================= */

class DashboardService {
  async getStats(signal?: AbortSignal): Promise<DashboardStats> {
    const { data } = await api.get<DashboardStats>(
      '/api/dashboard/stats',
      { signal }
    )

    return data
  }
}

/* =========================================================
   SINGLETON (évite recréation)
   ========================================================= */

export const dashboardService = new DashboardService()