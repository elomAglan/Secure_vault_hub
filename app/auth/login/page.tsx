'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation' // Import pour la redirection
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Chrome, ArrowRight, LockKeyhole } from 'lucide-react'

export default function UserLoginPage() {
  const router = useRouter() // Initialisation du router
  
  // Animation du curseur
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirection immédiate vers le dashboard
    router.push('/dashboard')
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
        {/* Header */}
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
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Bon retour
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Connectez-vous pour accéder à votre coffre-fort numérique.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-200/40">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@entreprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="rounded-lg border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">Mot de passe</Label>
                  <Link href="/auth/forgot-password" virtual-link="true" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                    Oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="rounded-lg border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, remember: checked as boolean })
                  }
                  className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="remember" className="text-sm font-medium text-slate-500 cursor-pointer select-none">
                  Rester connecté
                </Label>
              </div>

              {/* Bouton qui redirige au clic */}
              <Button type="submit" className="w-full bg-slate-900 py-6 text-white hover:bg-slate-800 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98]">
                Se connecter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Séparateur */}
            <div className="my-8 flex items-center gap-3">
              <div className="flex-1 border-t border-slate-100"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ou continuer avec</span>
              <div className="flex-1 border-t border-slate-100"></div>
            </div>

            {/* Social Logins - J'ai ajouté onClick pour simuler la redirection aussi ici */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard')}
                className="border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 gap-2 text-xs font-bold py-5 transition-all active:scale-95"
              >
                <Chrome className="h-4 w-4 text-red-500" />
                Google
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard')}
                className="border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 gap-2 text-xs font-bold py-5 transition-all active:scale-95"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Pied de page */}
        <div className="text-center space-y-4">
          <p className="text-sm text-slate-500">
            Pas encore de compte ?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:underline font-bold">
              Créer un compte
            </Link>
          </p>
          <div className="flex justify-center items-center gap-2 text-slate-400 text-[10px] font-medium uppercase tracking-widest">
            <LockKeyhole className="h-3 w-3" />
            Sessions sécurisées par AES-256
          </div>
        </div>
      </div>
    </div>
  )
}