import { create } from "zustand"
import { webhookService, Webhook, CreateWebhookPayload } from "@/app/services/webhookService"

interface WebhookState {
  webhooks: Webhook[]
  isLoading: boolean
  error: string | null
  fetchWebhooks: (projectId: number) => Promise<void>
  createWebhook: (projectId: number, data: CreateWebhookPayload) => Promise<void>
  updateWebhook: (projectId: number, webhookId: number, data: CreateWebhookPayload) => Promise<void>
  deleteWebhook: (projectId: number, webhookId: number) => Promise<void>
  clearError: () => void
}

export const useWebhookStore = create<WebhookState>((set) => ({
  webhooks: [],
  isLoading: false,
  error: null,

  fetchWebhooks: async (projectId) => {
    set({ isLoading: true, error: null })
    try {
      const webhooks = await webhookService.getAll(projectId)
      set({ webhooks, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Erreur lors du chargement",
        isLoading: false,
      })
    }
  },

  createWebhook: async (projectId, data) => {
    set({ isLoading: true, error: null })
    try {
      const webhook = await webhookService.create(projectId, data)
      set((state) => ({
        webhooks: [...state.webhooks, webhook],
        isLoading: false,
      }))
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Erreur lors de la création",
        isLoading: false,
      })
      throw error
    }
  },

  updateWebhook: async (projectId, webhookId, data) => {
    set({ isLoading: true, error: null })
    try {
      const updated = await webhookService.update(projectId, webhookId, data)
      set((state) => ({
        webhooks: state.webhooks.map((w) => w.id === webhookId ? updated : w),
        isLoading: false,
      }))
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Erreur lors de la modification",
        isLoading: false,
      })
      throw error
    }
  },

  deleteWebhook: async (projectId, webhookId) => {
    set({ isLoading: true, error: null })
    try {
      await webhookService.delete(projectId, webhookId)
      set((state) => ({
        webhooks: state.webhooks.filter((w) => w.id !== webhookId),
        isLoading: false,
      }))
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Erreur lors de la suppression",
        isLoading: false,
      })
      throw error
    }
  },

  clearError: () => set({ error: null }),
}))
