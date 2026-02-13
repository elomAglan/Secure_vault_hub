'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MarketingHeader } from '@/components/marketing/header'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  Lock, 
  Code, 
  Github, 
  Twitter,
  ChevronRight,
  Globe,
  Key,
  Fingerprint,
  Cloud
} from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function LandingPage() {
  // Logic pour le suivi du curseur (Projecteur)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // On lisse le mouvement pour plus de fluidité
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 })
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 })

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  const features = [
    {
      icon: Shield,
      title: "Sécurité maximale",
      desc: "Chiffrement AES-256, conformité RGPD et SOC2"
    },
    {
      icon: Zap,
      title: "Performance",
      desc: "Authentification en < 100ms grâce à notre edge network"
    },
    {
      icon: Users,
      title: "Multi-tenant",
      desc: "Gérez plusieurs applications et équipes"
    },
    {
      icon: Lock,
      title: "SSO Enterprise",
      desc: "SAML, OIDC, Active Directory, Google Workspace"
    },
    {
      icon: Key,
      title: "MFA adaptatif",
      desc: "Biométrie, SMS, TOTP, clés de sécurité"
    },
    {
      icon: Cloud,
      title: "Cloud hybride",
      desc: "Déployez sur notre cloud ou le vôtre"
    }
  ]

  const steps = [
    { title: "Installez le SDK", desc: "npm install @securevault/sdk", icon: <Code className="w-5 h-5" /> },
    { title: "Configurez les clés", desc: "Ajoutez vos identifiants API dans votre .env", icon: <Lock className="w-5 h-5" /> },
    { title: "Ajoutez le Provider", desc: "Enveloppez votre application avec notre AuthProvider", icon: <Users className="w-5 h-5" /> },
    { title: "Déployez", desc: "Vos utilisateurs sont sécurisés en 5 minutes", icon: <Zap className="w-5 h-5" /> },
  ]

  return (
    <div 
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#fafaf8] text-[#1c1c1c] selection:bg-[#94a3b8]/30"
      onMouseMove={handleMouseMove}
    >
      {/* EFFET DE CURSEUR plus subtil pour le thème clair */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 opacity-30"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(100, 116, 139, 0.08), transparent 80%)`
          )
        }}
      />

      <MarketingHeader />

     {/* Hero Section - Version Marketing Épurée */}
<section className="relative z-10 flex-1 px-4 pt-36 pb-20 text-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {/* Badge d'annonce */}
    <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 mb-8 shadow-sm">
      ✦ Nouvelle version 2.0 disponible
    </span>

    {/* Titre Principal */}
    <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl text-slate-900">
      L'authentification <br />
      <span className="bg-gradient-to-r from-blue-600 to-slate-500 bg-clip-text text-transparent">
        Simple & Robuste
      </span>
    </h1>

    {/* Sous-titre */}
    <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-500 leading-relaxed">
      SecureVault offre une gestion d'identité de classe entreprise pour les applications modernes. 
      Protégez vos données et gérez vos accès sans aucune friction technique.
    </p>

    {/* Boutons d'action */}
    <div className="mt-10 flex flex-wrap justify-center gap-4">
      <Button 
        size="lg" 
        asChild
        className="bg-slate-900 hover:bg-slate-800 text-white px-10 h-14 text-base font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-slate-200"
      >
        <Link href="/auth/signup">
          Démarrer gratuitement <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </Button>

      <Button 
        size="lg" 
        variant="outline" 
        asChild
        className="border-slate-200 bg-white/80 backdrop-blur-md px-10 h-14 text-base font-bold rounded-full text-slate-600 hover:bg-slate-50 transition-all"
      >
        <Link href="/docs">
          Consulter la Doc
        </Link>
      </Button>
    </div>
  </motion.div>
</section>

      {/* Section Fonctionnalités */}
      <section className="relative z-10 py-24 bg-white border-y border-[#e2e8f0]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl text-[#1c1c1c]">Fonctionnalités clés</h2>
            <p className="text-[#64748b] mt-4">Tout ce dont vous avez besoin pour sécuriser vos applications</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#94a3b8] transition-all shadow-sm hover:shadow-md group"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#475569] group-hover:bg-[#e2e8f0] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-[#1c1c1c]">{feature.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section Intégration verticale */}
      <section className="relative z-10 py-24 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Partie gauche : Texte */}
            <div>
              <span className="text-[#64748b] text-sm font-semibold tracking-wider">INTÉGRATION PAS À PAS</span>
              <h2 className="text-3xl font-bold mt-4 mb-6 text-[#1c1c1c]">Prêt en 5 minutes, vraiment.</h2>
              <p className="text-[#64748b] mb-8">
                Notre SDK s'intègre en quelques lignes de code. Suivez le guide, on s'occupe du reste.
              </p>
              
              {/* Timeline verticale */}
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="flex gap-4 group"
                  >
                    {/* Timeline avec ligne */}
                    <div className="relative flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#e2e8f0] border border-[#cbd5e1] flex items-center justify-center text-[#475569] font-bold text-sm group-hover:bg-[#334155] group-hover:text-white group-hover:border-[#334155] transition-all z-10">
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-0.5 h-12 bg-gradient-to-b from-[#cbd5e1] to-transparent mt-1" />
                      )}
                    </div>
                    
                    {/* Contenu */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-[#475569]">{step.icon}</div>
                        <h3 className="font-semibold text-lg text-[#1c1c1c]">{step.title}</h3>
                      </div>
                      <p className="text-sm text-[#64748b]">{step.desc}</p>
                      {index === 0 && (
                        <div className="mt-3 p-3 bg-[#1c1c1c] rounded-lg border border-[#334155] font-mono text-xs text-[#e2e8f0]">
                          <span className="text-[#94a3b8]">$</span> npm install @securevault/sdk
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button className="mt-8 bg-[#334155] hover:bg-[#1e293b] text-white rounded-full px-8">
                Voir la documentation complète <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
            
            {/* Partie droite : Visuel/Illustration */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#cbd5e1]/20 to-[#94a3b8]/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white border border-[#e2e8f0] rounded-2xl p-8 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#f87171]" />
                  <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                  <div className="w-3 h-3 rounded-full bg-[#4ade80]" />
                  <span className="text-xs text-[#94a3b8] ml-2">Terminal</span>
                </div>
                <pre className="text-xs text-[#334155] font-mono">
                  <span className="text-[#475569]">import</span> {'{'} AuthProvider {'}'} <span className="text-[#475569]">from</span> <span className="text-[#64748b]">'@securevault/sdk'</span>
                  <br />
                  <br />
                  <span className="text-[#1c1c1c]">function</span> <span className="text-[#334155]">App</span>() {'{'}
                  <br />
                  <span className="text-[#475569] ml-4">return</span> (
                  <br />
                  <span className="ml-8">{'<AuthProvider'}</span>
                  <br />
                  <span className="ml-12 text-[#475569]">apiKey</span>=<span className="text-[#64748b]">"sk_live_123"</span>
                  <br />
                  <span className="ml-12 text-[#475569]">domain</span>=<span className="text-[#64748b]">"app.com"</span>
                  <br />
                  <span className="ml-8">{'>'}</span>
                  <br />
                  <span className="ml-12">{'<YourApp />'}</span>
                  <br />
                  <span className="ml-8">{'</AuthProvider>'}</span>
                  <br />
                  <span className="ml-4">{')'}</span>
                  <br />
                  {'}'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer avec le bouclier */}
<footer className="relative z-10 border-t border-slate-200 bg-white pt-24 pb-12">
  <div className="mx-auto max-w-7xl px-6">
    
    {/* CTA Footer - Large Card */}
    <div className="mb-24 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 p-8 md:p-16 text-center shadow-2xl shadow-slate-200 relative overflow-hidden">
      {/* Petit effet de lumière interne */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white tracking-tight">
        Prêt à sécuriser votre futur ?
      </h2>
      <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">
        Rejoignez plus de 10,000 développeurs qui font confiance à SecureVault pour leur sécurité.
      </p>
      
      <Button 
        size="lg" 
        asChild
        className="bg-white text-slate-900 hover:bg-slate-50 rounded-full px-12 h-14 text-base font-bold transition-all hover:scale-105 active:scale-95"
      >
        <Link href="/auth/signup">
          Essai Gratuit
        </Link>
      </Button>
    </div>

    {/* Bottom Section */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
      {/* Branding */}
      <div className="flex items-center gap-3">
        <div className="relative h-9 w-9 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
          <Image 
            src="/bouclier.png"
            alt="SecureVault"
            fill
            className="object-contain p-1"
          />
        </div>
        <span className="text-xl font-bold tracking-tighter text-slate-900">SecureVault</span>
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-semibold text-slate-500">
        <Link href="/features" className="hover:text-blue-600 transition-colors">Produit</Link>
        <Link href="/pricing" className="hover:text-blue-600 transition-colors">Tarifs</Link>
        <Link href="/privacy" className="hover:text-blue-600 transition-colors">Confidentialité</Link>
        <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
      </nav>

      {/* Socials */}
      <div className="flex gap-5">
        <Twitter className="w-5 h-5 text-slate-400 hover:text-blue-400 cursor-pointer transition-colors" />
        <Github className="w-5 h-5 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
      </div>
    </div>
    
    {/* Copyright */}
    <div className="mt-16 pt-8 border-t border-slate-50 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
        © {new Date().getFullYear()} SecureVault Inc. — Sécurité de classe entreprise
      </p>
    </div>
  </div>
</footer>
    </div>
  )
}