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

      {/* Hero Section - Layout deux colonnes avec image */}
      <section className="relative z-10 flex-1 px-4 pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Colonne gauche : Texte */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge d'annonce */}
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 mb-8 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Nouvelle version 2.0 disponible
              </span>

              {/* Titre Principal */}
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-slate-900 leading-tight">
                L&apos;authentification<br />
                <span className="bg-gradient-to-r from-blue-600 to-slate-500 bg-clip-text text-transparent">
                  Simple &amp; Robuste
                </span>
              </h1>

              {/* Sous-titre */}
              <p className="mt-6 max-w-xl text-lg text-slate-500 leading-relaxed">
                SecureVault offre une gestion d&apos;identité de classe entreprise pour les applications modernes.
                Protégez vos données et gérez vos accès sans aucune friction technique.
              </p>

              {/* Stats rapides */}
              <div className="mt-8 flex gap-8">
                {[
                  { value: "10K+", label: "Développeurs" },
                  { value: "99.9%", label: "Disponibilité" },
                  { value: "<100ms", label: "Latence" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Boutons d'action */}
              <div className="mt-10 flex flex-wrap gap-4">
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

            {/* Colonne droite : Image hero avec effet flottant */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                x: { duration: 0.8, delay: 0.2 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
              }}
              className="relative hidden lg:block"
            >
              {/* Halo lumineux derrière l'image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 via-slate-100 to-transparent rounded-3xl blur-2xl opacity-70" />

              {/* Conteneur image avec overlay bottom */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-100/60 border border-slate-100">
                <Image
                  src="/Data_security_27.jpg"
                  alt="Sécurité des données SecureVault"
                  width={720}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Overlay dégradé en bas */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

                {/* Badge flottant sécurité */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-slate-100">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Chiffrement AES-256</p>
                    <p className="text-xs text-slate-500">Conformité RGPD &amp; SOC2 certifiée</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-semibold text-green-600">Actif</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Section Fonctionnalités */}
      <section className="relative z-10 py-28 bg-gradient-to-b from-white to-slate-50/80 border-y border-slate-100 overflow-hidden">
        {/* Décoration de fond */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(219,234,254,0.3),_transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header amélioré */}
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-blue-50 border border-blue-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
              Tout inclus
            </span>
            <h2 className="text-3xl font-extrabold sm:text-4xl text-slate-900 tracking-tight">
              Fonctionnalités clés
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Tout ce dont vous avez besoin pour sécuriser vos applications, sans compromis.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon
              const colors = [
                "bg-blue-50 text-blue-600",
                "bg-violet-50 text-violet-600",
                "bg-emerald-50 text-emerald-600",
                "bg-amber-50 text-amber-600",
                "bg-rose-50 text-rose-600",
                "bg-cyan-50 text-cyan-600",
              ]
              const dotColors = [
                "bg-blue-500",
                "bg-violet-500",
                "bg-emerald-500",
                "bg-amber-500",
                "bg-rose-500",
                "bg-cyan-500",
              ]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.08)" }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="group relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-all shadow-sm cursor-default"
                >
                  {/* Numéro discret */}
                  <span className="absolute top-4 right-5 text-xs font-bold text-slate-200 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Icône colorée */}
                  <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${colors[i]} transition-transform group-hover:scale-110`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Ligne séparateur colorée */}
                  <div className={`h-0.5 w-8 rounded-full ${dotColors[i]} mb-4 opacity-60`} />

                  <h3 className="font-bold text-base mb-2 text-slate-900">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
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