'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/shared/logo'
import { teamService } from '@/app/services/teamService'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function AcceptInvitePage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')?.trim() ?? ''
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const hasAttempted = useRef(false)

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setError("Le token d'invitation est manquant ou invalide.")
      return
    }

    if (hasAttempted.current) return
    hasAttempted.current = true

    const run = async () => {
      setStatus('loading')
      setError(null)
      try {
        await teamService.acceptInvitation(token)
        setStatus('success')
      } catch (err: unknown) {
        const backendMessage =
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
            ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
            : null

        setStatus('error')
        setError(backendMessage ?? "Impossible d'accepter l'invitation. Le lien est peut-être expiré.")
      }
    }

    void run()
  }, [token])

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Acceptation de l&apos;invitation</h1>
          <p className="mt-2 text-foreground/60">Connexion de votre compte à l&apos;espace équipe</p>
        </div>

        <Card className="border border-border p-8">
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-3 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-foreground/70">Validation de votre invitation...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Invitation acceptée</h2>
                <p className="mt-2 text-sm text-foreground/70">
                  Votre accès a bien été activé. Vous pouvez maintenant ouvrir votre espace.
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href="/dashboard">Accéder au dashboard</Link>
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-destructive/10 p-3">
                  <XCircle className="h-10 w-10 text-destructive" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Invitation invalide</h2>
                <p className="mt-2 text-sm text-foreground/70">{error}</p>
              </div>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/auth/login">Aller à la connexion</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">Retour à l&apos;accueil</Link>
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
