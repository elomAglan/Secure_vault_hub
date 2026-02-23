import api from "@/lib/api"

export interface TeamMember {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  joinedAt: string
}

export interface TeamInvitation {
  id: number
  email: string
  status: string
  createdAt: string
  expiresAt: string
}

export interface InviteMemberPayload {
  email: string
}

export const teamService = {
  getMembers: async (projectId: number): Promise<TeamMember[]> => {
    const response = await api.get(`/api/projects/${projectId}/team/members`)
    return response.data
  },

  invite: async (projectId: number, data: InviteMemberPayload): Promise<TeamInvitation> => {
    const response = await api.post(`/api/projects/${projectId}/team/invite`, data)
    return response.data
  },

  getPendingInvitations: async (projectId: number): Promise<TeamInvitation[]> => {
    const response = await api.get(`/api/projects/${projectId}/team/invitations`)
    return response.data
  },

  cancelInvitation: async (projectId: number, invitationId: number): Promise<void> => {
    await api.delete(`/api/projects/${projectId}/team/invitations/${invitationId}`)
  },

  acceptInvitation: async (token: string): Promise<void> => {
    await api.post(`/api/team/accept/${token}`)
  },
}