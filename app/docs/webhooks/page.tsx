'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Webhook, 
  ArrowRightLeft, 
  ShieldCheck, 
  Code2, 
  Copy, 
  Check, 
  BellRing,
  Activity
} from 'lucide-react'

// Correction : Export default obligatoire
export default function WebhooksPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const events = [
    { name: "user.created", desc: "Déclenché quand un utilisateur s'inscrit." },
    { name: "session.started", desc: "Déclenché à chaque connexion réussie." },
    { name: "auth.failed", desc: "Alerte en cas de tentative de connexion échouée." }
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
            Temps Réel
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4 font-sans">
            Webhooks
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Recevez des notifications en temps réel sur votre serveur dès qu'un événement survient sur votre projet SecureVault.
          </p>
        </header>

        {/* Workflow Diagram Simple */}
        <div className="mb-12 rounded-2xl border border-slate-200/50 bg-white p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Activity className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">Événement</p>
            </div>
            <ArrowRightLeft className="hidden sm:block h-5 w-5 text-slate-300" />
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
                <Webhook className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">SecureVault</p>
            </div>
            <ArrowRightLeft className="hidden sm:block h-5 w-5 text-slate-300" />
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                <BellRing className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">Votre Serveur</p>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-sans">
            <Code2 className="h-5 w-5 text-blue-500" />
            Exemple de Endpoint (Node.js)
          </h2>
          <div className="relative group">
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-[13px] leading-relaxed">
              <code>{`app.post('/webhooks', (req, res) => {
  const event = req.body;

  if (event.type === 'user.created') {
    console.log('Nouvel utilisateur :', event.data.email);
  }

  res.status(200).send('Reçu');
});`}</code>
            </pre>
            <button 
              onClick={() => copyToClipboard("app.post('/webhooks'...", 'webhook-code')}
              className="absolute right-4 top-4 transition-all duration-200"
            >
              {copiedId === 'webhook-code' ? (
                <div className="flex items-center gap-1.5 text-green-400">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Copié</span>
                  <Check className="h-4 w-4" />
                </div>
              ) : (
                <Copy className="h-4 w-4 text-slate-500 hover:text-white transition-colors" />
              )}
            </button>
          </div>
        </section>

        {/* Event List */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 font-sans">Événements disponibles</h2>
          <div className="divide-y divide-slate-100 border-t border-slate-100">
            {events.map((event, idx) => (
              <div key={idx} className="flex flex-col py-4 sm:flex-row sm:items-center justify-between gap-2">
                <code className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-fit">
                  {event.name}
                </code>
                <p className="text-sm text-slate-500">{event.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Security Alert */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Vérification des signatures</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pour des raisons de sécurité, vérifiez toujours la signature <code>x-vault-signature</code> présente dans l'en-tête de la requête pour vous assurer qu'elle provient bien de nos serveurs.
            </p>
          </div>
        </section>
      </motion.div>
    </div>
  )
}