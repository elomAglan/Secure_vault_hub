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

export default function WebhooksDocPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const events = [
    { name: 'USER_CREATED',  label: 'user.created',  desc: "Déclenché quand un utilisateur s'inscrit via le SDK." },
    { name: 'USER_LOGIN',    label: 'user.login',    desc: 'Déclenché à chaque connexion réussie.' },
    { name: 'USER_DISABLED', label: 'user.disabled', desc: "Déclenché quand un admin désactive un utilisateur." },
    { name: 'USER_ENABLED',  label: 'user.enabled',  desc: "Déclenché quand un admin réactive un utilisateur." },
    { name: 'USER_DELETED',  label: 'user.deleted',  desc: "Déclenché quand un utilisateur est supprimé." },
  ]

  const nodeExample = `app.post('/webhooks/vault', (req, res) => {
  const secret = req.headers['x-vault-secret']

  // Vérifier que la requête vient bien de VaultSecure
  if (secret !== process.env.VAULT_WEBHOOK_SECRET) {
    return res.status(401).send('Non autorisé')
  }

  const { event, data, timestamp } = req.body

  if (event === 'USER_CREATED') {
    console.log('Nouvel utilisateur :', data.email)
    // Envoyer un email de bienvenue, créer un profil, etc.
  }

  if (event === 'USER_LOGIN') {
    console.log('Connexion de :', data.email)
  }

  if (event === 'USER_DELETED') {
    console.log('Utilisateur supprimé :', data.email)
    // Nettoyer les données de l'utilisateur
  }

  res.status(200).json({ received: true })
})`

  const nextjsExample = `// app/api/webhooks/vault/route.ts
export async function POST(req: Request) {
  const secret = req.headers.get('x-vault-secret')

  if (secret !== process.env.VAULT_WEBHOOK_SECRET) {
    return Response.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const body = await req.json()
  const { event, data } = body

  switch (event) {
    case 'USER_CREATED':
      await sendWelcomeEmail(data.email)
      break
    case 'USER_DELETED':
      await cleanupUserData(data.email)
      break
  }

  return Response.json({ received: true })
}`

  const payloadExample = `// Payload envoyé par VaultSecure
{
  "event": "USER_CREATED",
  "timestamp": "2026-02-22T20:00:00",
  "data": {
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}

// Headers de la requête
{
  "Content-Type": "application/json",
  "X-Vault-Secret": "votre_secret_unique",
  "X-Vault-Event": "USER_CREATED"
}`

  return (
    <div className="mx-auto max-w-4xl px-6 py-4 text-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-slate max-w-none"
      >
        {/* HEADER */}
        <header className="mb-12 border-b border-slate-200/60 pb-8">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Temps Réel
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4 font-sans">
            Webhooks
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Recevez des notifications automatiques sur votre serveur dès qu'un événement survient sur vos utilisateurs.
          </p>
        </header>

        {/* WORKFLOW */}
        <div className="mb-12 rounded-2xl border border-slate-200/50 bg-white p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Activity className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">Événement SDK</p>
              <p className="text-[10px] text-slate-400">signUp / signIn</p>
            </div>
            <ArrowRightLeft className="hidden sm:block h-5 w-5 text-slate-300" />
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
                <Webhook className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">VaultSecure</p>
              <p className="text-[10px] text-slate-400">Traitement & envoi</p>
            </div>
            <ArrowRightLeft className="hidden sm:block h-5 w-5 text-slate-300" />
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                <BellRing className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">Votre Serveur</p>
              <p className="text-[10px] text-slate-400">POST vers votre URL</p>
            </div>
          </div>
        </div>

        {/* EVENTS */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 font-sans">Événements disponibles</h2>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {events.map((event) => (
                <div
                  key={event.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-4 hover:bg-slate-50/50"
                >
                  <code className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-fit font-mono">
                    {event.label}
                  </code>
                  <p className="text-sm text-slate-500">{event.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAYLOAD */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 font-sans flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-500" />
            Structure du payload
          </h2>
          <div className="relative">
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-[13px] leading-relaxed">
              <code>{payloadExample}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(payloadExample, 'payload')}
              className="absolute right-4 top-4"
            >
              {copiedId === 'payload' ? (
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

        {/* NEXT.JS EXAMPLE */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 font-sans flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-500" />
            Exemple Next.js
          </h2>
          <div className="relative">
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-[13px] leading-relaxed">
              <code>{nextjsExample}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(nextjsExample, 'nextjs')}
              className="absolute right-4 top-4"
            >
              {copiedId === 'nextjs' ? (
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

        {/* NODE.JS EXAMPLE */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 font-sans flex items-center gap-2">
            <Code2 className="h-5 w-5 text-slate-400" />
            Exemple Node.js / Express
          </h2>
          <div className="relative">
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-[13px] leading-relaxed">
              <code>{nodeExample}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(nodeExample, 'node')}
              className="absolute right-4 top-4"
            >
              {copiedId === 'node' ? (
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

        {/* TEST EN LOCAL */}
        <section className="mb-12 rounded-2xl border border-blue-100 bg-blue-50/30 p-6">
          <h3 className="text-sm font-bold text-blue-900 mb-2">
            Tester en local avec ngrok
          </h3>
          <p className="text-xs text-blue-700/80 mb-4">
            Exposez votre localhost pour recevoir les webhooks pendant le développement.
          </p>
          <div className="relative">
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-[13px]">
              <code>{`# Installer ngrok
npm install -g ngrok

# Exposer votre port local
ngrok http 3000

# Utiliser l'URL générée dans votre dashboard
# Ex: https://abc123.ngrok.io/api/webhooks/vault`}</code>
            </pre>
            <button
              onClick={() => copyToClipboard('ngrok http 3000', 'ngrok')}
              className="absolute right-4 top-4"
            >
              {copiedId === 'ngrok' ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-slate-500 hover:text-white transition-colors" />
              )}
            </button>
          </div>
        </section>

        {/* SECURITY */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Vérification du secret
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Vérifiez toujours le header{' '}
              <code className="bg-slate-100 px-1 rounded">X-Vault-Secret</code>{' '}
              dans chaque requête entrante. Ce secret est unique par webhook et disponible dans votre dashboard. Ne l'exposez jamais dans votre frontend.
            </p>
          </div>
        </section>

      </motion.div>
    </div>
  )
}