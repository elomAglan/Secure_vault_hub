import api from "@/lib/api"
import { WebhookEvent } from "@/types/webhook"

export interface Webhook {
  id: number
  url: string
  secret: string
  enabled: boolean
  events: WebhookEvent[]
  createdAt: string
}

export interface CreateWebhookPayload {
  url: string
  events: WebhookEvent[]
  enabled: boolean
}

export const webhookService = {
  getAll: async (projectId: number): Promise<Webhook[]> => {
    const response = await api.get(`/api/projects/${projectId}/webhooks`)
    return response.data
  },

  create: async (projectId: number, data: CreateWebhookPayload): Promise<Webhook> => {
    const response = await api.post(`/api/projects/${projectId}/webhooks`, data)
    return response.data
  },

  update: async (projectId: number, webhookId: number, data: CreateWebhookPayload): Promise<Webhook> => {
    const response = await api.put(`/api/projects/${projectId}/webhooks/${webhookId}`, data)
    return response.data
  },

  delete: async (projectId: number, webhookId: number): Promise<void> => {
    await api.delete(`/api/projects/${projectId}/webhooks/${webhookId}`)
  },
}
