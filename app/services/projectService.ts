import api from "@/lib/api";
import { AuthProvider, Theme } from "@/types/project";

export interface CreateProjectPayload {
    name: string;
    authProviders: AuthProvider[];
    theme: Theme;
    primaryColor: string;
}

export interface Project {
    id: number;
    name: string;
    publicKey: string;
    secretKey: string;
    authProviders: AuthProvider[];
    theme: Theme;
    primaryColor: string;
    createdAt: string;
    owner: boolean
}

export const projectService = {
    create: async (data: CreateProjectPayload): Promise<Project> => {
        const response = await api.post("/api/projects", data);
        return response.data;
    },

    getAll: async (): Promise<Project[]> => {
        const response = await api.get("/api/projects");
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/api/projects/${id}`);
    },

    update: async (id: number, data: CreateProjectPayload): Promise<Project> => {
        const response = await api.put(`/api/projects/${id}`, data)
        return response.data
    },

    getMyRole: async (projectId: number): Promise<string> => {
        const response = await api.get(`/api/projects/${projectId}/my-role`)
        return response.data.role
    },
 
};