'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Copy, 
  Check, 
  Code2, 
  Layers, 
  Rocket, 
  ChevronRight,
  Monitor
} from 'lucide-react'

// C'est cet "export default" qui manquait ou qui était mal nommé
export default function IntegrationGuidePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const steps = [
    {
      title: "Configuration du Client",
      desc: "Installez et configurez le provider à la racine de votre application.",
      code: "npm install @securevault/react"
    },
    {
      title: "Envelopper l'application",
      desc: "Ajoutez le VaultProvider dans votre layout principal.",
      code: "<VaultProvider config={vaultConfig}>\n  {children}\n</VaultProvider>"
    }
  ]

  return (
    <div className="mx-auto max-w-4xl px-6 py-4 text-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-slate max-w-none"
      >
        {/* Header */}
        <header className="mb-12 border-b border-slate-200/60 pb-8">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Frameworks
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4 font-sans">
            Guide d'Intégration
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Connectez SecureVault à votre stack technologique préférée en quelques étapes simples.
          </p>
        </header>

        {/* Quick Choice */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {['Next.js', 'React', 'Vue.js'].map((stack) => (
            <div key={stack} className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm hover:border-blue-200 transition-colors cursor-pointer group">
              <span className="text-sm font-semibold text-slate-700">{stack}</span>
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
          ))}
        </div>

        {/* Integration Steps */}
        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-sans">
              <Layers className="h-5 w-5 text-blue-500" />
              Installation standard
            </h2>
            
            {steps.map((step, idx) => (
              <div key={idx} className="mb-8 last:mb-0">
                <div className="flex items-start gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-500">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-md font-semibold text-slate-800 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{step.desc}</p>
                    <div className="relative group">
                      <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-[13px]">
                        <code>{step.code}</code>
                      </pre>
                      <button 
                        onClick={() => copyToClipboard(step.code, `step-${idx}`)}
                        className="absolute right-4 top-4 transition-all duration-200"
                      >
                        {copiedId === `step-${idx}` ? (
                          <div className="flex items-center gap-1.5 text-green-400">
                            <span className="text-[10px] font-bold uppercase tracking-wider">Copié</span>
                            <Check className="h-4 w-4" />
                          </div>
                        ) : (
                          <Copy className="h-4 w-4 text-slate-500 hover:text-white transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="rounded-2xl border border-blue-100 bg-blue-50/30 p-8">
            <h2 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              Prêt pour le déploiement ?
            </h2>
            <p className="text-sm text-blue-700/80 mb-6">
              Une fois l'intégration terminée localement, consultez nos guides pour mettre votre application en production.
            </p>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
              Guide de déploiement
            </button>
          </section>
        </div>
      </motion.div>
    </div>
  )
}