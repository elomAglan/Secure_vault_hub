import { create } from "zustand"
import { projectService, Project, CreateProjectPayload } from "@/app/services/projectService"

interface ProjectState {
    projects: Project[]
    isLoading: boolean
    error: string | null
    fetchProjects: () => Promise<void>
    createProject: (data: CreateProjectPayload) => Promise<Project>
    deleteProject: (id: number) => Promise<void>
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

    clearError: () => set({ error: null }),
}))