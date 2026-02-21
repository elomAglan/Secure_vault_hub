import axios from "axios"

// Helper pour lire selon la préférence
const getToken = (key: string) =>
    localStorage.getItem(key) || sessionStorage.getItem(key)

// Helper pour stocker selon la préférence
export const saveTokens = (accessToken: string, refreshToken: string, remember: boolean) => {
    const storage = remember ? localStorage : sessionStorage
    storage.setItem("accessToken", accessToken)
    storage.setItem("refreshToken", refreshToken)
}

export const clearTokens = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("refreshToken")
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use((config) => {
    const accessToken = getToken("accessToken")
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = getToken("refreshToken")
                if (!refreshToken) throw new Error("No refresh token")

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
                    { refreshToken }
                )

                const { accessToken, refreshToken: newRefreshToken } = response.data

                // On remet dans le même storage que celui utilisé
                const inLocal = !!localStorage.getItem("refreshToken")
                saveTokens(accessToken, newRefreshToken, inLocal)

                originalRequest.headers.Authorization = `Bearer ${accessToken}`
                return api(originalRequest)
            } catch {
                clearTokens()
                window.location.href = "/login"
            }
        }

        return Promise.reject(error)
    }
)

export default api