'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { MarketingHeader } from '@/components/marketing/header'
import { Button } from '@/components/ui/button'
import { 
  Rocket, Bug, Zap, GitBranch, Calendar, ArrowRight, Star
} from 'lucide-react'
import Link from 'next/link'

export default function ChangelogPage() {
  // Animation du curseur (Effet de lumière identique à Features)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 })

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const updates = [
    {
      version: "v2.1.0",
      date: "12 Février 2026",
      title: "Optimisation des Webhooks",
      description: "Amélioration majeure de la latence et nouveau système de retry automatique.",
      icon: Zap,
      type: "Feature",
      tags: ["Performance", "Webhooks"]
    },
    {
      version: "v2.0.4",
      date: "28 Janvier 2026",
      title: "Correctifs de Sécurité",
      description: "Renforcement des politiques de validation des tokens JWT et headers HSTS.",
      icon: ShieldCheck,
      type: "Fix",
      tags: ["Sécurité"]
    },
    {
      version: "v2.0.0",
      date: "15 Janvier 2026",
      title: "Lancement de SecureVault V2",
      description: "Une refonte complète de l'infrastructure pour supporter le multi-tenant à grande échelle.",
      icon: Rocket,
      type: "Major",
      tags: ["Infrastructure", "Release"]
    },
    {
      version: "v1.9.5",
      date: "05 Janvier 2026",
      title: "Nouveau SDK React",
      description: "Simplification des hooks d'authentification et support natif de Next.js 16.",
      icon: Star,
      type: "Feature",
      tags: ["SDK", "React"]
    }
  ]

  return (
    <div 
      className="relative flex min-h-screen flex-col bg-[#F9FAFB] text-slate-900 overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      {/* EFFET DE CURSEUR */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-100"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.06), transparent 80%)`
          )
        }}
      />

      <MarketingHeader />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600"
          >
            <GitBranch className="h-3 w-3" />
            Journal des mises à jour
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            L'évolution de <span className="text-blue-600">SecureVault</span>
          </motion.h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
            Découvrez les dernières améliorations, correctifs et nouvelles fonctionnalités 
            déployés par notre équipe.
          </p>
        </div>
      </section>

      {/* Grille des Mises à jour */}
      <section className="relative z-10 py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {updates.map((update, i) => {
              const Icon = update.icon
              return (
                <motion.div
                  key={update.version}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="group h-full border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {update.date}
                      </span>
                    </div>
                    
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">{update.version}</h3>
                      <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-medium text-slate-500 italic">
                        {update.type}
                      </span>
                    </div>

                    <h4 className="mb-2 text-sm font-semibold text-slate-700">{update.title}</h4>
                    
                    <p className="text-sm leading-relaxed text-slate-500 mb-6">
                      {update.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-1">
                      {update.tags.map(tag => (
                        <span key={tag} className="text-[9px] border border-slate-100 px-2 py-0.5 rounded-full text-slate-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 mt-auto border-t border-slate-200/60 bg-white/50 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Restez à l'écoute</h2>
          <p className="text-slate-500 mb-8">
            Nous déployons des mises à jour chaque semaine. Abonnez-vous à notre newsletter pour ne rien manquer.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-8">
              S'abonner aux updates
            </Button>
            <Button size="lg" variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg px-8">
              <Link href="/docs">Lire la doc</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Petit helper pour l'icône manquante dans le snippet Features
function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}