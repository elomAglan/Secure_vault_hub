import { create } from "zustand"
import { projectService, CreateProjectPayload } from "@/app/services/projectService"
import { AuthProvider, Theme } from "@/types/project"

export interface Project {
    id: number
    name: string
    publicKey: string
    secretKey: string
    authProviders: AuthProvider[]
    theme: Theme
    primaryColor: string
    createdAt: string
    owner: boolean
}

interface ProjectState {
    projects: Project[]
    isLoading: boolean
    error: string | null
    fetchProjects: () => Promise<void>
    createProject: (data: CreateProjectPayload) => Promise<Project>
    deleteProject: (id: number) => Promise<void>
    updateProject: (id: number, data: CreateProjectPayload) => Promise<void>
    clearError: () => void
}

export const useProjectStore = create<ProjectState>((set, get) => ({
    projects: [],
    isLoading: false,
    error: null,

    fetchProjects: async () => {
        set({ isLoading: true, error: null })
        try {
            const projects = await projectService.getAll()
            set({ projects, isLoading: false })
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Erreur lors du chargement des projets",
                isLoading: false,
            })
        }
    },

    createProject: async (data) => {
        set({ isLoading: true, error: null })
        try {
            const newProject = await projectService.create(data)
            set((state) => ({
                projects: [newProject, ...state.projects],
                isLoading: false,
            }))
            return newProject
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Erreur lors de la création du projet",
                isLoading: false,
            })
            throw error
        }
    },

    deleteProject: async (id) => {
        set({ isLoading: true, error: null })
        try {
            await projectService.delete(id)
            set((state) => ({
                projects: state.projects.filter((p) => p.id !== id),
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

    updateProject: async (id: number, data: CreateProjectPayload) => {
        set({ isLoading: true, error: null })
        try {
            const updated = await projectService.update(id, data)
            set((state) => ({
            projects: state.projects.map((p) => p.id === id ? updated : p),
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

    clearError: () => set({ error: null }),
}))
  