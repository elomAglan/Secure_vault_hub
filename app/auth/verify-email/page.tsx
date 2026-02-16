'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, CheckCircle, ArrowRight, RefreshCcw } from 'lucide-react'

export default function VerifyEmailPage() {
  // Animation du curseur (Spotlight)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 })

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const [code, setCode] = useState('')
  const [verified, setVerified] = useState(false)
  const [resendCount, setResendCount] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length === 6) {
      setVerified(true)
    }
  }

  const handleResend = () => {
    setResendCount(resendCount + 1)
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
        
        {verified ? (
          /* État : Email Vérifié */
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
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Email vérifié !</h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Votre identité a été confirmée avec succès. Vous pouvez maintenant accéder à votre tableau de bord.
            </p>
            <Button asChild className="mt-8 w-full bg-slate-900 py-6 text-white hover:bg-slate-800 rounded-xl font-bold shadow-lg">
              <Link href="/first_app">
                Accéder à la configuration <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          /* État : Saisie du Code */
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
                Vérification
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Nous avons envoyé un code de sécurité à votre adresse email.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-slate-200/60 bg-white p-8 shadow-xl shadow-slate-200/40">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4 text-center">
                    <Label htmlFor="code" className="text-slate-700 font-bold text-xs uppercase tracking-[0.2em]">
                      Code de confirmation
                    </Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="0 0 0 0 0 0"
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                      className="text-center text-3xl font-mono font-bold tracking-[0.3em] h-16 rounded-xl border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-[11px] text-slate-400">
                      Entrez les 6 chiffres reçus par email.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 py-7 text-white hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
                    disabled={code.length !== 6}
                  >
                    Vérifier l'email
                  </Button>
                </form>

                {/* Section de renvoi */}
                <div className="mt-8 border-t border-slate-50 pt-6">
                  <p className="text-center text-xs text-slate-400 mb-4 font-medium">
                    Vous n'avez rien reçu ?
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold gap-2 py-5"
                    onClick={handleResend}
                    disabled={resendCount >= 3}
                  >
                    <RefreshCcw className={`h-3 w-3 ${resendCount > 0 ? 'animate-spin-once' : ''}`} />
                    {resendCount > 0 
                      ? `Renvoyer le code (${3 - resendCount} restants)` 
                      : 'Renvoyer un nouveau code'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}

        <div className="text-center">
          <Link href="/auth/login" className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
            Utiliser un autre compte
          </Link>
        </div>
      </div>
    </div>
  )
}