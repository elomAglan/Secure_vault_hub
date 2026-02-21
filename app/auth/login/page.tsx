'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import Image from 'next/image'
import { Github, ArrowRight, LockKeyhole, Mail, Lock, ShieldCheck, Globe, Users } from 'lucide-react'
import { LoadingOverlay } from '@/components/shared/LoadingOverlay'
import { useAuthStore } from '@/store/authStore'

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "Coffre-fort certifié",
    desc: "Vos données sont protégées par un chiffrement AES-256 de bout en bout, certifié SOC2 et RGPD.",
  },
  {
    icon: Globe,
    title: "Accessible partout",
    desc: "Connectez-vous depuis n'importe quel appareil. Votre session est synchronisée en temps réel.",
  },
  {
    icon: Users,
    title: "Adopté par 10 000+ équipes",
    desc: "Des startups aux grandes entreprises, SecureVault s'adapte à chaque contexte métier.",
  },
]

export default function UserLoginPage() {
  const router = useRouter()
  const { login, isLoading, error, clearError } = useAuthStore()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 })

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const [formData, setFormData] = useState({ email: '', password: '', remember: false })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login({ email: formData.email, password: formData.password }, formData.remember)
      router.push('/dashboard')
    } catch {
      // erreur déjà dans le store
    }
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4 py-12 text-slate-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <LoadingOverlay
        isVisible={isLoading}
        message="Connexion en cours..."
        subMessage="Vérification de vos identifiants"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.06), transparent 80%)`
          )
        }}
      />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* COLONNE GAUCHE */}
        <div className="space-y-10 lg:pr-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200">
                <Image src="/bouclier.png" alt="Logo SecureVault" width={32} height={32} priority />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">SecureVault</span>
            </div>

            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Bon retour<br />
                <span className="text-blue-600">sur votre coffre.</span>
              </h1>
              <p className="mt-4 text-slate-500 text-base leading-relaxed max-w-sm">
                Reconnectez-vous à votre espace sécurisé et reprenez là où vous vous étiez arrêté.
              </p>
            </div>
          </motion.div>

          <div className="space-y-6 relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200" />
            {TRUST_POINTS.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
                className="flex items-start gap-5 relative z-10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                  <point.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{point.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mt-0.5">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* COLONNE DROITE */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-md"
          >
            <Card className="border-slate-200/60 bg-white p-8 shadow-2xl shadow-slate-200/50 rounded-[2rem]">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Connexion</h2>
                <p className="text-slate-500 text-sm mt-1">Accédez à votre espace en quelques secondes.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="nom@entreprise.com"
                      value={formData.email}
                      onChange={(e) => {
                        clearError()
                        setFormData({ ...formData, email: e.target.value })
                      }}
                      className="pl-10 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* MOT DE PASSE */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Mot de passe
                    </Label>
                    <Link href="/auth/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                      Oublié ?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => {
                        clearError()
                        setFormData({ ...formData, password: e.target.value })
                      }}
                      className="pl-10 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* REMEMBER ME */}
                <div className="flex items-center gap-2 py-1 ml-1">
                  <Checkbox
                    id="remember"
                    checked={formData.remember}
                    onCheckedChange={(checked) => setFormData({ ...formData, remember: checked as boolean })}
                    className="rounded-md border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="remember" className="text-sm font-medium text-slate-500 cursor-pointer select-none">
                    Rester connecté
                  </Label>
                </div>

                {/* ERREUR API */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-xl border border-red-100"
                  >
                    {error}
                  </motion.p>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 py-6 text-white hover:bg-slate-800 rounded-xl font-bold transition-all shadow-xl active:scale-[0.98]"
                >
                  Se connecter <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              {/* SÉPARATEUR */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-100" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-400 font-bold tracking-widest">Ou</span>
                </div>
              </div>

              {/* SOCIAL LOGINS */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="h-12 border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 gap-2 font-bold transition-all active:scale-95"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="h-12 border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 gap-2 font-bold transition-all active:scale-95"
                >
                  <Github className="h-4 w-4 text-slate-900" />
                  GitHub
                </Button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                  Pas encore de compte ?{' '}
                  <Link href="/auth/signup" className="text-blue-600 font-bold hover:underline">
                    Créer un compte
                  </Link>
                </p>
              </div>
            </Card>
          </motion.div>

          <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-slate-100/50 rounded-full border border-slate-200/60">
            <LockKeyhole className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
              Session chiffrée <span className="text-slate-900">AES-256</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}