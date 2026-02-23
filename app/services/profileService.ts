import api from "@/lib/api"

export interface Profile {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: string
}

export interface UpdateProfilePayload {
  firstName: string
  lastName: string
  email: string
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

export const profileService = {
  getProfile: async (): Promise<Profile> => {
    const response = await api.get("/api/profile")
    return response.data
  },

  updateProfile: async (data: UpdateProfilePayload): Promise<Profile> => {
    const response = await api.put("/api/profile", data)
    return response.data
  },

  changePassword: async (data: ChangePasswordPayload): Promise<void> => {
    await api.put("/api/profile/change-password", data)
  },
}