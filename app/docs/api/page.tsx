'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Globe, Lock, AlertCircle, Zap, Shield } from 'lucide-react'

export default function ApiDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const sdkEndpoints = [
    {
      method: 'POST',
      path: '/sdk/{publicKey}/auth/register',
      desc: 'Inscrire un utilisateur dans votre projet',
      auth: 'publicKey',
      body: `{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "MotDePasse123"
}`
    },
    {
      method: 'POST',
      path: '/sdk/{publicKey}/auth/login',
      desc: 'Connecter un utilisateur dans votre projet',
      auth: 'publicKey',
      body: `{
  "email": "john@example.com",
  "password": "MotDePasse123"
}`
    },
  ]

  const adminEndpoints = [
    {
      method: 'GET',
      path: '/sdk/admin/users',
      desc: 'Lister tous les utilisateurs de votre projet',
      auth: 'secretKey',
    },
    {
      method: 'DELETE',
      path: '/sdk/admin/users/{email}',
      desc: 'Supprimer un utilisateur de votre projet',
      auth: 'secretKey',
    },
    {
      method: 'PATCH',
      path: '/sdk/admin/users/{email}/disable',
      desc: 'Désactiver un utilisateur',
      auth: 'secretKey',
    },
    {
      method: 'PATCH',
      path: '/sdk/admin/users/{email}/enable',
      desc: 'Réactiver un utilisateur',
      auth: 'secretKey',
    },
    {
      method: 'POST',
      path: '/sdk/admin/verify-token',
      desc: 'Vérifier la validité d\'un token JWT',
      auth: 'secretKey',
      body: `{
  "token": "eyJhbGciOiJIUzUxMiJ9..."
}`
    },
  ]

  const methodColor = (method: string) => {
    if (method === 'GET') return 'bg-green-50 text-green-600 border border-green-100'
    if (method === 'POST') return 'bg-blue-50 text-blue-600 border border-blue-100'
    if (method === 'PATCH') return 'bg-yellow-50 text-yellow-600 border border-yellow-100'
    if (method === 'DELETE') return 'bg-red-50 text-red-600 border border-red-100'
    return ''
  }

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
            Documentation Technique
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4 font-sans">
            Référence API
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            SecureVault propose une API RESTful complète. Utilisez le SDK <code className="text-blue-600 bg-blue-50 px-1 rounded">@vaultsecure/js</code> ou appelez directement les endpoints ci-dessous.
          </p>
        </header>

        {/* URL DE BASE */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 font-sans">
            <Globe className="h-5 w-5 text-slate-400" />
            URL de base
          </h2>
          <code className="rounded-lg bg-white border border-slate-200 px-4 py-2 text-blue-600 font-mono text-sm shadow-sm inline-block">
            https://api.securevault.com
          </code>
        </section>

        {/* AUTHENTIFICATION */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 font-sans">
            <Lock className="h-5 w-5 text-blue-500" />
            Authentification
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Clé Publique</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Utilisée dans le <strong>frontend</strong> pour les opérations utilisateur (register, login). Passée dans l'URL.
              </p>
              <code className="text-[10px] font-mono text-blue-700 mt-2 block">pk_abc123...</code>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">Clé Secrète</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Utilisée <strong>uniquement en backend</strong> pour les opérations admin. Passée dans le header.
              </p>
              <code className="text-[10px] font-mono text-amber-700 mt-2 block">sk_abc123...</code>
            </div>
          </div>

          <div className="relative group">
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm">
              <code>{`# Endpoints SDK (publicKey dans l'URL)
curl https://api.securevault.com/sdk/pk_votre_cle/auth/login

# Endpoints Admin (secretKey dans le header)
curl https://api.securevault.com/sdk/admin/users \\
  -H "X-Secret-Key: sk_votre_cle_secrete"`}</code>
            </pre>
            <button
              onClick={() => copyToClipboard('X-Secret-Key: sk_votre_cle_secrete', 'auth')}
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

        {/* ENDPOINTS SDK */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-2 font-sans">Endpoints SDK — Client</h2>
          <p className="text-sm text-slate-500 mb-6">
            Appelés depuis votre frontend avec la <span className="text-blue-600 font-bold">clé publique</span>.
          </p>
          <div className="space-y-4">
            {sdkEndpoints.map((ep, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${methodColor(ep.method)}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm font-bold text-slate-700">{ep.path}</code>
                </div>
                <p className="text-sm text-slate-500 mb-4">{ep.desc}</p>
                {ep.body && (
                  <div className="relative">
                    <pre className="bg-slate-50 rounded-xl p-4 text-[13px] text-slate-600 border border-slate-100 overflow-x-auto">
                      <code>{ep.body}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(ep.body!, `sdk-${idx}`)}
                      className="absolute right-3 top-3"
                    >
                      {copiedId === `sdk-${idx}`
                        ? <Check className="h-3.5 w-3.5 text-green-500" />
                        : <Copy className="h-3.5 w-3.5 text-slate-400 hover:text-slate-700" />
                      }
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ENDPOINTS ADMIN */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-2 font-sans">Endpoints Admin — Backend</h2>
          <p className="text-sm text-slate-500 mb-3">
            Appelés depuis votre backend avec la <span className="text-amber-600 font-bold">clé secrète</span> dans le header <code className="bg-slate-100 px-1 rounded text-xs">X-Secret-Key</code>.
          </p>

          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
            <Shield className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-700 font-medium">
              Ne jamais exposer la clé secrète dans votre frontend. Utilisez uniquement dans des API routes, serveurs Node.js, ou environnements sécurisés.
            </p>
          </div>

          <div className="space-y-4">
            {adminEndpoints.map((ep, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${methodColor(ep.method)}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm font-bold text-slate-700">{ep.path}</code>
                </div>
                <p className="text-sm text-slate-500 mb-4">{ep.desc}</p>
                {ep.body && (
                  <div className="relative">
                    <pre className="bg-slate-50 rounded-xl p-4 text-[13px] text-slate-600 border border-slate-100 overflow-x-auto">
                      <code>{ep.body}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(ep.body!, `admin-${idx}`)}
                      className="absolute right-3 top-3"
                    >
                      {copiedId === `admin-${idx}`
                        ? <Check className="h-3.5 w-3.5 text-green-500" />
                        : <Copy className="h-3.5 w-3.5 text-slate-400 hover:text-slate-700" />
                      }
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ERREURS + RATE LIMIT */}
        <div className="grid gap-6 sm:grid-cols-2 mt-12">
          <section className="rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-900 font-sans uppercase tracking-wider">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              Codes d'erreur
            </h3>
            <ul className="space-y-2 text-[13px] text-slate-600 list-none p-0 m-0">
              {[
                { code: '200', desc: 'Succès' },
                { code: '400', desc: 'Données invalides' },
                { code: '401', desc: 'Token expiré ou invalide' },
                { code: '403', desc: 'Clé invalide ou accès refusé' },
                { code: '404', desc: 'Ressource introuvable' },
                { code: '500', desc: 'Erreur serveur' },
              ].map((e) => (
                <li key={e.code} className="flex justify-between border-b border-slate-50 pb-1 last:border-0">
                  <span className="font-mono font-bold">{e.code}</span>
                  <span className="text-slate-400">{e.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-900 font-sans uppercase tracking-wider">
              <Zap className="h-4 w-4 text-yellow-500" />
              Limites (Rate Limit)
            </h3>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              L'API est limitée à <strong>1000 requêtes par minute</strong> par projet.
              <br /><br />
              Vérifiez les headers de réponse pour connaître votre quota restant.
            </p>
            <div className="mt-4 bg-slate-50 rounded-xl p-3 font-mono text-[11px] text-slate-500 border border-slate-100">
              X-RateLimit-Limit: 1000<br />
              X-RateLimit-Remaining: 999<br />
              X-RateLimit-Reset: 1708000000
            </div>
          </section>
        </div>

      </motion.div>
    </div>
  )
}