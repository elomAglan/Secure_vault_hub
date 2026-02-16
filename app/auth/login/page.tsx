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
import { Github, ArrowRight, LockKeyhole, Mail, Lock, Loader2 } from 'lucide-react'

export default function UserLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // Animation du curseur (Identique à la page Signup pour la cohérence)
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
    setIsLoading(true)
    // Simulation d'une petite attente réseau pour le "feeling" premium
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <div 
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] px-4 py-12 text-slate-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* EFFET DE CURSEUR (Le même que sur Signup) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.08), transparent 80%)`
          )
        }}
      />

      <div className="relative z-10 w-full max-w-[440px] space-y-8">
        {/* LOGO & TITRE */}
        <div className="text-center space-y-2">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200">
              <Image src="/bouclier.png" alt="Logo" width={40} height={40} priority />
            </div>
          </motion.div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Bon retour
          </h2>
          <p className="text-slate-500">
            Entrez vos accès pour gérer votre coffre.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-slate-200/60 bg-white p-8 shadow-2xl shadow-slate-200/50 rounded-[2rem]">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* EMAIL AVEC ICÔNE */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="nom@entreprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10 h-12 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* PASSWORD AVEC ICÔNE */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500">Mot de passe</Label>
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
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
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

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-slate-900 py-6 text-white hover:bg-slate-800 rounded-xl font-bold transition-all shadow-xl active:scale-[0.98]"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>Se connecter <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </form>

            {/* SÉPARATEUR */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
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
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
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
          </Card>
        </motion.div>

        {/* PIED DE PAGE */}
        <div className="text-center space-y-6">
          <p className="text-sm text-slate-500">
            Pas encore de compte ?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:underline font-bold">
              Créer un compte
            </Link>
          </p>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-200/60 shadow-sm">
            <LockKeyhole className="h-3 w-3 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Session chiffrée AES-256
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}