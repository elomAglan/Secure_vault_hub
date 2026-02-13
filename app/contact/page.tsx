'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { MarketingHeader } from '@/components/marketing/header'
import { Button } from '@/components/ui/button'
import { 
  Mail, MessageSquare, Shield, LifeBuoy, 
  Send, MapPin, Phone, ArrowRight 
} from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  // Animation du curseur (Effet de lumière identique aux autres pages)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 })

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const contactMethods = [
    { 
      icon: MessageSquare, 
      title: 'Support Technique', 
      description: 'Besoin d’aide pour l’intégration ? Nos ingénieurs vous répondent.',
      contact: 'support@securevault.com'
    },
    { 
      icon: Shield, 
      title: 'Sécurité & Bug Bounty', 
      description: 'Signalez une vulnérabilité ou posez des questions sur la conformité.',
      contact: 'security@securevault.com'
    },
    { 
      icon: LifeBuoy, 
      title: 'Ventes & Partenariats', 
      description: 'Discutez de nos plans entreprise et des solutions sur mesure.',
      contact: 'sales@securevault.com'
    },
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Parlons de votre <span className="text-blue-600">projet</span>
            </h1>
            <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
              Notre équipe est là pour vous accompagner. Que ce soit pour une question technique 
              ou un devis personnalisé, nous sommes à votre écoute.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content: Contact Form & Info */}
      <section className="relative z-10 py-12 px-6 mb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Formulaire de Contact */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="border-slate-200/60 bg-white p-8 shadow-sm">
                <form className="grid gap-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Nom complet</label>
                      <input type="text" placeholder="John Doe" className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Email professionnel</label>
                      <input type="email" placeholder="john@entreprise.com" className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Sujet</label>
                    <select className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none transition-colors">
                      <option>Support Technique</option>
                      <option>Demande de démo</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Message</label>
                    <textarea rows={5} placeholder="Comment pouvons-nous vous aider ?" className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none"></textarea>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-6 font-bold">
                    Envoyer le message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Info Cards Column */}
            <div className="flex flex-col gap-4">
              {contactMethods.map((method, i) => {
                const Icon = method.icon
                return (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="group border-slate-200/60 bg-white p-6 shadow-sm hover:border-blue-200 transition-all">
                      <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{method.title}</h3>
                      <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                        {method.description}
                      </p>
                      <p className="text-xs font-semibold text-blue-600">{method.contact}</p>
                    </Card>
                  </motion.div>
                )
              })}
              
              {/* Petite section Adresse/Réseaux */}
              <div className="mt-4 px-2 space-y-4">
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Station F, Paris, France</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+33 1 23 45 67 89</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA final pour la Doc */}
      <section className="relative z-10 mt-auto border-t border-slate-200/60 bg-white/50 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Besoin d'une réponse immédiate ?</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 font-sans">Consultez notre documentation</h2>
          <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg px-8">
            <Link href="/docs" className="flex items-center gap-2">
              Aller vers les Docs <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}