import { toast } from 'sonner'

/**
 * Hook centralisé pour les toasts de l'application.
 * Utilise Sonner avec des styles cohérents et des icônes appropriées.
 */
export const appToast = {
    success: (message: string, description?: string) =>
        toast.success(message, {
            description,
            duration: 4000,
        }),

    error: (message: string, description?: string) =>
        toast.error(message, {
            description,
            duration: 6000,
        }),

    info: (message: string, description?: string) =>
        toast.info(message, {
            description,
            duration: 4000,
        }),

    warning: (message: string, description?: string) =>
        toast.warning(message, {
            description,
            duration: 5000,
        }),

    loading: (message: string) =>
        toast.loading(message),

    promise: <T>(
        promise: Promise<T>,
        messages: {
            loading: string
            success: string | ((data: T) => string)
            error: string | ((err: unknown) => string)
        }
    ) =>
        toast.promise(promise, {
            loading: messages.loading,
            success: messages.success,
            error: messages.error,
        }),

    dismiss: (id?: string | number) => toast.dismiss(id),
}
