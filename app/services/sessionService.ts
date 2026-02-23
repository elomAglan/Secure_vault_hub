import api from "@/lib/api"

export interface SdkSession {
  id: number
  email: string
  ipAddress: string
  userAgent: string
  active: boolean
  createdAt: string
}

export interface SessionsResponse {
  sessions: SdkSession[]
  totalElements: number
  totalPages: number
  currentPage: number
}

export const sessionService = {
  getSessions: async (
    secretKey: string,
    page = 0,
    size = 10
  ): Promise<SessionsResponse> => {
    const response = await api.get("/sdk/admin/sessions", {
      headers: { "X-Secret-Key": secretKey },
      params: { page, size },
    })
    return response.data
  },

  revokeSession: async (secretKey: string, sessionId: number): Promise<void> => {
    await api.delete(`/sdk/admin/sessions/${sessionId}`, {
      headers: { "X-Secret-Key": secretKey },
    })
  },
}