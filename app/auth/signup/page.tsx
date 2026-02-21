'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'
import { Check, X, ArrowRight, ShieldCheck, Zap, Code, Lock } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { LoadingOverlay } from '@/components/shared/LoadingOverlay'

export default function UserSignupPage() {
  const { register, isLoading, error, clearError } = useAuthStore()
  const router = useRouter()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 })

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    clearError()
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      })
      router.push('/dashboard')
    } catch {
      // erreur déjà gérée dans le store via auth.ts
    }
  }

  const passwordStrength = {
    hasMinLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
  }

  const isStrongPassword = Object.values(passwordStrength).every(Boolean)

  const steps = [
    { icon: Zap, title: "Créez votre compte", desc: "Accès instantané à votre coffre." },
    { icon: Code, title: "Intégrez le SDK", desc: "Copiez-collez 3 lignes de code." },
    { icon: Lock, title: "Sécurisez vos users", desc: "Authentification AES-256 active." }
  ]

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4 py-12 text-slate-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* OVERLAY DE CHARGEMENT CENTRALISÉ */}
      <LoadingOverlay
        isVisible={isLoading}
        message="Création de votre compte..."
        subMessage="Chiffrement de vos données en cours"
      />
      {/* EFFET DE CURSEUR */}
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
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200">
                <Image src="/bouclier.png" alt="Logo" width={32} height={32} />
              </div>
              <span className="text-xl font-bold tracking-tight">SecureVault</span>
            </motion.div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Prêt à sécuriser <br />
              <span className="text-blue-600">vos applications ?</span>
            </h1>
          </div>

          <div className="space-y-8 relative">
            <div className="absolute left-[23px] top-2 bottom-2 w-px bg-slate-200" />
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="flex items-start gap-6 relative z-10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                  <step.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* COLONNE DROITE : FORMULAIRE */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Card className="border-slate-200/60 bg-white p-8 shadow-2xl shadow-slate-200/50 rounded-[2rem]">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Inscription</h2>
                <p className="text-slate-500 text-sm">Démarrez votre essai gratuit de 14 jours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* PRÉNOM + NOM */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="rounded-xl border-slate-200 bg-slate-50/50 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="rounded-xl border-slate-200 bg-slate-50/50 h-12"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email professionnel</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-xl border-slate-200 bg-slate-50/50 h-12"
                  />
                </div>

                {/* MOT DE PASSE */}
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="rounded-xl border-slate-200 bg-slate-50/50 h-12"
                  />

                  {formData.password && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2"
                    >
                      {Object.entries(passwordStrength).map(([key, valid], i) => (
                        <div key={key} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                          {valid
                            ? <Check className="h-3 w-3 text-green-500" />
                            : <X className="h-3 w-3 text-slate-300" />
                          }
                          <span className={valid ? 'text-slate-900' : 'text-slate-400'}>
                            {['8+ carac.', 'Majuscule', 'Minuscule', 'Chiffre'][i]}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>


                {/* BOUTON */}
                <Button
                  type="submit"
                  className="w-full bg-slate-900 py-6 text-white hover:bg-slate-800 rounded-xl font-bold transition-all shadow-xl active:scale-95"
                  disabled={(!isStrongPassword && formData.password !== '') || isLoading}
                >
                  {isLoading ? 'Création en cours...' : 'Créer mon compte'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                  Déjà client ?{' '}
                  <Link href="/auth/login" className="text-blue-600 font-bold hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </Card>
          </motion.div>

          <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-slate-100/50 rounded-full border border-slate-200/60">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
              Sécurisé par <span className="text-slate-900">SecureVault</span> AES-256
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}