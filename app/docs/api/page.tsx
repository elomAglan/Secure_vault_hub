'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Terminal, Globe, Lock, AlertCircle, Zap } from 'lucide-react'

export default function ApiDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const endpoints = [
    { method: 'POST', path: '/users', desc: 'Créer un nouvel utilisateur', body: '{\n  "email": "user@example.com",\n  "password": "secure_password",\n  "name": "John Doe"\n}' },
    { method: 'GET', path: '/users', desc: 'Lister les utilisateurs (paginé)', query: '?limit=10&offset=0' },
    { method: 'GET', path: '/users/:userId', desc: 'Récupérer un utilisateur spécifique' },
    { method: 'PATCH', path: '/users/:userId', desc: 'Mettre à jour les infos', body: '{\n  "name": "Jane Doe"\n}' },
    { method: 'DELETE', path: '/users/:userId', desc: 'Supprimer un utilisateur' },
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
            Documentation Technique
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4 font-sans">
            Référence API
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            SecureVault propose une API RESTful pour gérer l'authentification et les sessions utilisateurs en toute simplicité.
          </p>
        </header>

        {/* Auth Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 font-sans">
            <Lock className="h-5 w-5 text-blue-500" />
            Authentification
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            Toutes les requêtes API nécessitent votre clé secrète. Incluez-la dans l'en-tête Authorization :
          </p>
          <div className="relative group">
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">
              <code>{`curl https://api.securevault.com/v1/users \\
  -H "Authorization: Bearer sk_live_VOTRE_CLE_PRIVEE"`}</code>
            </pre>
            <button 
              onClick={() => copyToClipboard('Authorization: Bearer sk_live_VOTRE_CLE_PRIVEE', 'auth')}
              className="absolute right-4 top-4 transition-all duration-200"
            >
              {copiedId === 'auth' ? (
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

        {/* Base URL */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 font-sans">
            <Globe className="h-5 w-5 text-slate-400" />
            URL de base
          </h2>
          <code className="rounded-lg bg-white border border-slate-200 px-4 py-2 text-blue-600 font-mono text-sm shadow-sm inline-block">
            https://api.securevault.com/v1
          </code>
        </section>

        {/* Endpoints */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 font-sans">Endpoints</h2>
          <div className="space-y-6">
            {endpoints.map((ep, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    ep.method === 'GET' ? 'bg-green-50 text-green-600 border border-green-100' :
                    ep.method === 'POST' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                    'bg-orange-50 text-orange-600 border border-orange-100'
                  }`}>
                    {ep.method}
                  </span>
                  <code className="text-sm font-bold text-slate-700">{ep.path}{ep.query}</code>
                </div>
                <p className="text-sm text-slate-500 mb-4">{ep.desc}</p>
                {ep.body && (
                  <pre className="bg-slate-50 rounded-lg p-4 text-[13px] text-slate-600 border border-slate-100">
                    <code>{ep.body}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Error Handling & Rate Limit Grid */}
        <div className="grid gap-6 sm:grid-cols-2 mt-12">
          <section className="rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-900 font-sans uppercase tracking-wider">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              Gestion des erreurs
            </h3>
            <ul className="space-y-2 text-[13px] text-slate-600 list-none p-0 m-0">
              <li className="flex justify-between border-b border-slate-50 pb-1"><span>200</span> <span className="text-slate-400">Succès</span></li>
              <li className="flex justify-between border-b border-slate-50 pb-1"><span>400</span> <span className="text-slate-400">Mauvaise requête</span></li>
              <li className="flex justify-between border-b border-slate-50 pb-1"><span>401</span> <span className="text-slate-400">Non autorisé</span></li>
              <li className="flex justify-between border-b border-slate-50 pb-1"><span>404</span> <span className="text-slate-400">Non trouvé</span></li>
              <li className="flex justify-between"><span>500</span> <span className="text-slate-400">Erreur serveur</span></li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-900 font-sans uppercase tracking-wider">
              <Zap className="h-4 w-4 text-yellow-500" />
              Limites (Rate Limit)
            </h3>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              L'API est limitée à <strong>1000 requêtes par minute</strong>. 
              <br /><br />
              Vérifiez les en-têtes de réponse pour connaître votre quota restant en temps réel.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  )
}