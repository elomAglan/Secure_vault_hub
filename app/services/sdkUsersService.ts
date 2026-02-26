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

const authHeader = (secretKey: string) => ({
  headers: { "X-Secret-Key": secretKey },
})

export const sdkUsersService = {

  getUsers: async (
    secretKey: string,
    query = "",
    page = 0,
    size = 10
  ): Promise<ProjectUsersResponse> => {

    const { data } = await api.get<ProjectUsersResponse>(
      "/sdk/admin/users/search",
      {
        ...authHeader(secretKey),
        params: { query, page, size },
      }
    )

    return data
  },


  disableUser: async (secretKey: string, email: string): Promise<void> => {
    await api.patch(
      `/sdk/admin/users/${encodeURIComponent(email)}/disable`,
      {},
      authHeader(secretKey)
    )
  },


  enableUser: async (secretKey: string, email: string): Promise<void> => {
    await api.patch(
      `/sdk/admin/users/${encodeURIComponent(email)}/enable`,
      {},
      authHeader(secretKey)
    )
  },


  deleteUser: async (secretKey: string, email: string): Promise<void> => {
    await api.delete(
      `/sdk/admin/users/${encodeURIComponent(email)}`,
      authHeader(secretKey)
    )
  },
}