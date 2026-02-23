import api from "@/lib/api"

export interface ProjectUserItem {
  id: number
  firstName: string
  lastName: string
  email: string
  enabled: boolean
  createdAt: string
}

export interface ProjectUsersResponse {
  users: ProjectUserItem[]
  totalElements: number
  totalPages: number
  currentPage: number
}

export const sdkUsersService = {
  getUsers: async (
    secretKey: string,
    query = "",
    page = 0,
    size = 10
  ): Promise<ProjectUsersResponse> => {
    const response = await api.get("/sdk/admin/users/search", {
      headers: { "X-Secret-Key": secretKey },
      params: { query, page, size },
    })
    return response.data
  },

  disableUser: async (secretKey: string, email: string): Promise<void> => {
    await api.patch(`/sdk/admin/users/${email}/disable`, {}, {
      headers: { "X-Secret-Key": secretKey },
    })
  },

  enableUser: async (secretKey: string, email: string): Promise<void> => {
    await api.patch(`/sdk/admin/users/${email}/enable`, {}, {
      headers: { "X-Secret-Key": secretKey },
    })
  },

  deleteUser: async (secretKey: string, email: string): Promise<void> => {
    await api.delete(`/sdk/admin/users/${email}`, {
      headers: { "X-Secret-Key": secretKey },
    })
  },
}