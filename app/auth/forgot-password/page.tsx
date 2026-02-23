'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CheckCircle, Mail, Send } from 'lucide-react'
import { authService } from '@/app/services/authService'

export default function ForgotPasswordPage() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 })

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      await authService.forgotPassword(email)
      setSubmitted(true)
    } catch {
      // On affiche le même message même en cas d'erreur
      // pour ne pas révéler si l'email existe ou non
      setSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] px-4 py-12 text-slate-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* EFFET DE CURSEUR */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-100"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.08), transparent 80%)`
          )
        }}
      />

      <div className="relative z-10 w-full max-w-md space-y-8">

        {/* État : Email envoyé */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="rounded-2xl bg-green-50 p-4 border border-green-100 shadow-sm shadow-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Vérifiez vos emails
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Si un compte existe pour :<br />
              <span className="font-bold text-slate-900 underline decoration-blue-200">{email}</span>
              <br />un lien de réinitialisation a été envoyé.
            </p>

            <Card className="mt-8 border-slate-200/60 bg-white p-6 shadow-xl shadow-slate-200/40">
              <p className="text-xs text-slate-400 mb-6">
                Vous n'avez rien reçu ? Vérifiez vos spams ou réessayez avec une autre adresse.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 py-6 rounded-xl font-bold"
              >
                <Link href="/auth/login">Retour à la connexion</Link>
              </Button>
            </Card>
          </motion.div>
        ) : (
          /* État : Formulaire */
          <>
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center mb-6"
              >
                <div className="relative h-16 w-16 p-3 bg-white rounded-2xl shadow-sm border border-slate-200/60">
                  <Image
                    src="/bouclier.png"
                    alt="SecureVault Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </motion.div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                Réinitialisation
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Entrez votre email pour recevoir un lien de récupération sécurisé.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-200/40">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 font-semibold text-[11px] uppercase tracking-widest"
                    >
                      Email Professionnel
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="nom@entreprise.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="rounded-lg border-slate-200 bg-slate-50/50 pl-10 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 py-6 text-white hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
                  >
                    {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
                    {!isLoading && <Send className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </Card>
            </motion.div>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Retourner au portail de connexion
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}