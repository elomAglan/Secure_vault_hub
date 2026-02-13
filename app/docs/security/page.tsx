'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  EyeOff, 
  RefreshCcw, 
  Copy, 
  Check,
  ShieldAlert
} from 'lucide-react'

// Correction : Ajout de l'export default obligatoire pour Next.js
export default function SecurityPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const securityPractices = [
    {
      title: "Clés API Secrètes",
      desc: "Ne divulguez jamais vos clés secrètes (sk_). Utilisez des variables d'environnement côté serveur uniquement.",
      icon: Key
    },
    {
      title: "Rotation des Clés",
      desc: "Nous recommandons de changer vos clés API tous les 90 jours pour minimiser les risques.",
      icon: RefreshCcw
    },
    {
      title: "Chiffrement AES-256",
      desc: "Toutes les données sensibles sont chiffrées au repos en utilisant l'algorithme AES-256.",
      icon: Lock
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
            Protection des données
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4 font-sans">
            Sécurité et Confidentialité
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            La sécurité est au cœur de SecureVault. Découvrez comment nous protégeons vos utilisateurs et comment sécuriser votre implémentation.
          </p>
        </header>

        {/* Security Grid */}
        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          {securityPractices.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 font-sans">{item.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Best Practices Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-sans">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            Bonnes Pratiques
          </h2>
          
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200/60 bg-white p-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <EyeOff className="h-4 w-4 text-slate-400" />
                Masquage des données sensibles
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Utilisez toujours notre middleware pour filtrer les données avant de les renvoyer au client.
              </p>
              <div className="relative group">
                <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-[13px]">
                  <code>{`// Exemple de hachage côté client
const securedEmail = vault.utils.mask(user.email)`}</code>
                </pre>
                <button 
                  onClick={() => copyToClipboard('vault.utils.mask(user.email)', 'mask-code')}
                  className="absolute right-4 top-4 transition-all duration-200"
                >
                  {copiedId === 'mask-code' ? (
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
        </section>

        {/* Danger Zone / Alert */}
        <section className="rounded-2xl border border-red-100 bg-red-50/30 p-8 border-dashed">
          <h2 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Signaler une vulnérabilité
          </h2>
          <p className="text-sm text-red-700/80 mb-4 italic">
            Vous pensez avoir trouvé une faille ? Ne l'exploitez pas. Contactez-nous immédiatement.
          </p>
          <a 
            href="mailto:security@securevault.com" 
            className="text-sm font-bold text-red-600 hover:underline"
          >
            security@securevault.com →
          </a>
        </section>
      </motion.div>
    </div>
  )
}