'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MarketingHeader } from '@/components/marketing/header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Check,ChevronDown } from 'lucide-react'
import { mockPricingPlans } from '@/lib/mock-data'

export default function PricingPage() {
  // Animation du curseur subtile
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 })

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const faqs = [
    {
      question: 'Puis-je changer de forfait à tout moment ?',
      answer: 'Oui, vous pouvez passer au forfait supérieur ou inférieur quand vous le souhaitez. Les changements sont immédiats.',
    },
    {
      question: 'Proposez-vous des réductions pour un paiement annuel ?',
      answer: 'Oui, nous offrons une réduction de 20% lorsque vous choisissez la facturation annuelle.',
    },
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer: 'Absolument, tous nos forfaits Pro incluent un essai gratuit de 14 jours. Aucune carte de crédit requise.',
    },
    {
      question: 'Quels modes de paiement acceptez-vous ?',
      answer: 'Nous acceptons toutes les cartes bancaires majeures, les virements et les bons de commande pour les entreprises.',
    },
    {
      question: 'Proposez-vous des remboursements ?',
      answer: 'Nous offrons une garantie satisfait ou remboursé de 30 jours sur les forfaits payants.',
    },
    {
      question: 'Qu’est-ce qui est inclus dans le forfait Entreprise ?',
      answer: 'Les plans Entreprise incluent des fonctionnalités sur mesure, un support dédié et des garanties de service (SLA).',
    },
  ]

  return (
    <div 
      className="relative flex min-h-screen flex-col bg-[#F9FAFB] text-slate-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Halo de curseur discret */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-100"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.05), transparent 80%)`
          )
        }}
      />

      <MarketingHeader />

      {/* Header des tarifs */}
      <section className="relative z-10 py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Tarification Simple et Transparente
          </motion.h1>
          <p className="text-lg text-slate-500">
            Choisissez le forfait idéal pour votre application. Payez uniquement pour ce que vous utilisez.
          </p>
        </div>
      </section>

      {/* Grille des tarifs */}
      <section className="relative z-10 pb-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3 items-start">
            {mockPricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`relative flex flex-col p-8 transition-all duration-300 ${
                    plan.highlighted 
                    ? 'border-blue-500 shadow-xl shadow-blue-500/5 bg-white md:scale-105' 
                    : 'border-slate-200/60 bg-white/80 shadow-sm hover:shadow-md'
                  }`}
                >
                  {plan.highlighted && (
                    <Badge className="absolute -top-3 left-6 bg-blue-600 text-white border-none">Plus populaire</Badge>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    {plan.price !== null ? (
                      <div>
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="text-slate-500 text-sm ml-1">/mois</span>
                        <p className="mt-2 text-[12px] text-slate-400">
                          Économisez 20% avec la facturation annuelle.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-2xl font-bold">Sur mesure</span>
                        <p className="mt-2 text-sm text-slate-500 text-[12px]">
                          Adapté à vos besoins spécifiques
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    className={`mb-8 w-full rounded-lg ${
                      plan.highlighted ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-200'
                    }`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* FAQ Section - Design Épuré */}
<section className="relative z-10 border-t border-slate-200/60 bg-white/40 py-24 px-6">
  <div className="mx-auto max-w-3xl">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">Questions Fréquentes</h2>
      <p className="mt-4 text-slate-500 text-sm">
        Tout ce que vous devez savoir sur nos tarifs et nos services.
      </p>
    </div>

    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <details 
          key={index} 
          className="group rounded-2xl border border-slate-200/50 bg-white/50 px-6 py-4 transition-all hover:border-slate-300"
        >
          <summary className="flex cursor-pointer items-center justify-between list-none">
            <h3 className="text-sm font-semibold text-slate-900">{faq.question}</h3>
            <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform group-open:rotate-180">
              <ChevronDown className="h-4 w-4" />
            </div>
          </summary>
          <div className="mt-4 text-sm leading-relaxed text-slate-500 border-t border-slate-100 pt-4">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>

    <div className="mt-16 text-center">
      <p className="text-sm text-slate-400">
        Vous avez encore des questions ? 
        <Link href="/contact" className="ml-1 font-medium text-blue-600 hover:underline">
          Contactez notre support
        </Link>
      </p>
    </div>
  </div>
</section>
    </div>
  )
}