'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { saveTokens } from '@/lib/api'
import { Loader2 } from 'lucide-react'

function OAuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuthStore()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')
    const email = searchParams.get('email')
    const firstName = searchParams.get('firstName') ?? ''
    const lastName = searchParams.get('lastName') ?? ''
    const error = searchParams.get('error')

    if (error || !accessToken || !refreshToken || !email) {
      router.push('/auth/login?error=oauth_failed')
      return
    }

    // Sauvegarde les tokens
    saveTokens(accessToken, refreshToken, true)

    // Met à jour le store manuellement
    useAuthStore.setState({
      user: { email, firstName, lastName, role: 'USER' },
      isAuthenticated: true,
    })

    router.push('/dashboard')
  }, [searchParams, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
        <p className="text-foreground/60">Connexion en cours...</p>
      </div>
    </div>
  )
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <OAuthCallbackContent />
    </Suspense>
  )
}          