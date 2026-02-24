import api from "@/lib/api"

export interface Profile {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: string
  companyName: string | null
  website: string | null
  supportEmail: string | null
  description: string | null
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

export interface UpdateSettingsPayload {
  companyName: string
  website: string
  supportEmail: string
  description: string
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

  getSettings: async (): Promise<Profile> => {
    const response = await api.get("/api/profile/settings")
    return response.data
  },

  updateSettings: async (data: UpdateSettingsPayload): Promise<Profile> => {
    const response = await api.put("/api/profile/settings", data)
    return response.data
  },

  deleteAccount: async (): Promise<void> => {
    await api.delete("/api/profile/account")
  },
}    