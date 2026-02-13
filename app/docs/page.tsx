'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Terminal, CheckCircle2, Lightbulb, Mail } from 'lucide-react'
import Link from 'next/link'

export default function DocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-4 text-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-slate max-w-none"
      >
        {/* En-tête de la Doc */}
        <header className="mb-12 border-b border-slate-200/60 pb-8">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Guide Rapide
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Bien démarrer avec SecureVault
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Bienvenue sur SecureVault ! Ce guide vous aidera à configurer votre plateforme 
            d'authentification en quelques minutes seulement.
          </p>
        </header>

        {/* Prérequis */}
        <section className="mb-12 rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-500" />
            Prérequis
          </h2>
          <ul className="grid gap-2 text-sm text-slate-600 list-none p-0">
            <li className="flex items-center gap-2 font-medium">
               • Un compte SecureVault (<Link href="/signup" className="text-blue-600 hover:underline text-sm">Inscription gratuite</Link>)
            </li>
            <li className="font-medium text-sm"> • Node.js 14+ ou équivalent</li>
            <li className="font-medium text-sm"> • Votre framework web favori (Next.js, React, Vue, etc.)</li>
          </ul>
        </section>

        {/* Étapes */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans">1. Créer un Projet</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Une fois inscrit, créez votre premier projet. Cela générera les clés API nécessaires pour authentifier vos requêtes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2 font-sans">
              <Terminal className="h-5 w-5 text-slate-400" />
              2. Installer le SDK
            </h2>
            <div className="relative group">
              <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">
                <code>npm install @securevault/sdk</code>
              </pre>
              <button 
                onClick={() => copyToClipboard('npm install @securevault/sdk', 'step2')}
                className="absolute right-4 top-4 transition-all duration-200"
              >
                {copiedId === 'step2' ? (
                  <div className="flex items-center gap-1.5 text-green-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Copié !</span>
                    <Check className="h-4 w-4" />
                  </div>
                ) : (
                  <Copy className="h-4 w-4 text-slate-500 hover:text-white transition-colors" />
                )}
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans">3. Initialiser le Client</h2>
            <div className="relative group">
              <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">
                <code>{`import { SecureVault } from '@securevault/sdk'

const client = new SecureVault({
  apiKey: process.env.SECUREVAULT_API_KEY,
  projectId: process.env.SECUREVAULT_PROJECT_ID,
})`}</code>
              </pre>
              <button 
                onClick={() => copyToClipboard(`import { SecureVault } from '@securevault/sdk'\n\nconst client = new SecureVault({\n  apiKey: process.env.SECUREVAULT_API_KEY,\n  projectId: process.env.SECUREVAULT_PROJECT_ID,\n})`, 'step3')}
                className="absolute right-4 top-4 transition-all duration-200"
              >
                {copiedId === 'step3' ? (
                  <div className="flex items-center gap-1.5 text-green-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Copié !</span>
                    <Check className="h-4 w-4" />
                  </div>
                ) : (
                  <Copy className="h-4 w-4 text-slate-500 hover:text-white transition-colors" />
                )}
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide font-sans">4. Implémenter la Connexion</h2>
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">
              <code>{`// Créer une session de connexion
const session = await client.auth.createSession({
  email: 'user@example.com',
  password: 'mot_de_passe_securise',
})

console.log('Session créée :', session.id)`}</code>
            </pre>
          </section>
        </div>

        {/* Étapes suivantes */}
        <section className="mt-16 rounded-2xl bg-blue-50/50 p-8 border border-blue-100">
          <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2 font-sans">
            <Lightbulb className="h-5 w-5" />
            Étapes suivantes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Référence API', href: '/docs/api' },
              { label: 'Guides Intégration', href: '/docs/guides' },
              { label: 'Meilleures pratiques', href: '/docs/security' },
              { label: 'Configuration Webhooks', href: '/docs/webhooks' },
            ].map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className="flex items-center justify-between rounded-xl bg-white p-4 text-sm font-semibold text-blue-700 shadow-sm border border-blue-100/50 hover:shadow-md transition-all group"
              >
                {item.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>

        {/* Support */}
        <footer className="mt-16 border-t border-slate-200 pt-8 text-center pb-12">
          <h2 className="text-lg font-bold mb-2 font-sans text-slate-900">Besoin d'aide ?</h2>
          <p className="text-slate-500 text-sm mb-6">
            Notre équipe est disponible pour vous accompagner dans votre intégration.
          </p>
          <div className="flex justify-center">
            <a href="mailto:support@securevault.com" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              <Mail className="h-4 w-4" /> support@securevault.com
            </a>
          </div>
        </footer>
      </motion.div>
    </div>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}