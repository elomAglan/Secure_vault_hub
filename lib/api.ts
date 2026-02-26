import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

/* ======================================================
   STORAGE HELPERS
====================================================== */

const getStorage = (remember: boolean) => remember ? localStorage : sessionStorage;
const getToken = (key: string) => localStorage.getItem(key) || sessionStorage.getItem(key);

const setClientCookie = (name: string, value: string, remember: boolean) => {
  if (typeof document === "undefined") return;
  const base = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax`;
  const withExpiry = remember ? `${base}; Max-Age=${60 * 60 * 24 * 30}` : base;
  document.cookie = withExpiry;
};

const clearClientCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
};

export const saveTokens = (accessToken: string, refreshToken: string, remember: boolean) => {
  const storage = getStorage(remember);
  storage.setItem("accessToken", accessToken);
  storage.setItem("refreshToken", refreshToken);
  setClientCookie("accessToken", accessToken, remember);
  setClientCookie("refreshToken", refreshToken, remember);
};

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  clearClientCookie("accessToken");
  clearClientCookie("refreshToken");
};

/* ======================================================
   AXIOS INSTANCE
====================================================== */

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

/* ======================================================
   REQUEST INTERCEPTOR -> add access token
====================================================== */

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ======================================================
   RESPONSE INTERCEPTOR -> auto refresh
====================================================== */

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (err: unknown) => void }[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token as string);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;

    // Si c'est pas une 401, juste rejeter l'erreur et laisser le composant gérer
    if (status !== 401) {
      return Promise.reject(error);
    }

    // Ne jamais refresh sur ces endpoints, juste renvoyer l'erreur
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/logout") ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error); // ❌ Pas de redirect automatique
    }

    // Evite les boucles
    if (originalRequest._retry) {
      clearTokens();
      return Promise.reject(error); // on laisse le composant gérer le redirect si besoin
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = getToken("refreshToken");
      if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const payload: any = response.data?.data ?? response.data;
      const accessToken = payload?.accessToken;
      const newRefreshToken = payload?.refreshToken ?? refreshToken;

      if (!accessToken) throw new Error("Invalid refresh response");

      const inLocal = !!localStorage.getItem("refreshToken");
      saveTokens(accessToken, newRefreshToken, inLocal);

      processQueue(null, accessToken);

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      clearTokens();
      return Promise.reject(err); // ❌ on laisse le composant afficher le message
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;           