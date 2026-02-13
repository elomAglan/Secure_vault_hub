'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { MarketingHeader } from '@/components/marketing/header'
import { Button } from '@/components/ui/button'
import { 
  Shield, Zap, Users, Lock, Code, 
  BarChart3, Globe, Smartphone, ArrowRight 
} from 'lucide-react'
import Link from 'next/link'

export default function FeaturesPage() {
  // Animation du curseur (Effet de lumière subtil sur blanc)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 })

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const features = [
    { icon: Shield, title: 'Sécurité Entreprise', description: 'Chiffrement de haut niveau et audits réguliers pour vos données.' },
    { icon: Users, title: 'Multi-tenant', description: 'Gérez plusieurs applications via un seul tableau de bord.' },
    { icon: Zap, title: 'Ultra Rapide', description: 'Authentification globale en moins d’une milliseconde.' },
    { icon: Code, title: 'API Simple', description: 'Documentation complète et SDKs pour tous vos langages.' },
    { icon: Lock, title: 'Zero Trust', description: 'Contrôle total sur les politiques et la gestion des sessions.' },
    { icon: BarChart3, title: 'Analyses', description: 'Suivi en temps réel des connexions et des événements.' },
    { icon: Globe, title: 'Échelle Mondiale', description: 'Infrastructure résiliente capable de gérer des millions de requêtes.' },
    { icon: Smartphone, title: 'Multi-appareil', description: 'Expérience fluide sur Web, iOS, Android et Desktop.' },
  ]

  return (
    <div 
      className="relative flex min-h-screen flex-col bg-[#F9FAFB] text-slate-900" // Fond Blanc Sale
      onMouseMove={handleMouseMove}
    >
      {/* EFFET DE CURSEUR (Spotlight discret pour fond clair) */}
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
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            Fonctionnalités avancées pour <br />
            <span className="text-blue-600">votre authentification</span>
          </motion.h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
            Tout le nécessaire pour bâtir une gestion d'identité robuste et scalable sans la complexité.
          </p>
        </div>
      </section>

      {/* Grille des Fonctionnalités */}
      <section className="relative z-10 py-12 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="group h-full border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-200">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold text-slate-900">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {feature.description}
                    </p>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Prêt à tester ?</h2>
          <p className="text-slate-500 mb-8">
            Rejoignez les développeurs qui choisissent la simplicité et la sécurité.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-8">
              <Link href="/auth/signup">Démarrer l'essai</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg px-8">
              <Link href="/docs">Documentation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}