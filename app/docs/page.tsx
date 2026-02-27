'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Terminal, CheckCircle2, Lightbulb, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const CodeBlock = ({ code, id }: { code: string; id: string }) => (
    <div className="relative group">
      <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => copyToClipboard(code, id)}
        className="absolute right-4 top-4 transition-all duration-200"
      >
        {copiedId === id ? (
          <div className="flex items-center gap-1.5 text-green-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Copié !</span>
            <Check className="h-4 w-4" />
          </div>
        ) : (
          <Copy className="h-4 w-4 text-slate-500 hover:text-white transition-colors" />
        )}
      </button>
    </div>
  )

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
            Guide Rapide
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Bien démarrer avec SecureVault
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Bienvenue sur SecureVault ! Ce guide vous aidera à intégrer l'authentification dans votre application en quelques minutes.
          </p>
        </header>

        {/* PRÉREQUIS */}
        <section className="mb-12 rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-500" />
            Prérequis
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 list-none p-0">
            <li className="flex items-center gap-2 font-medium">
              • Un compte SecureVault (<Link href="/auth/signup" className="text-blue-600 hover:underline">Inscription gratuite</Link>)
            </li>
            <li className="font-medium">• Node.js 14+ ou équivalent</li>
            <li className="font-medium">• Votre framework favori (Next.js, React, Vue, etc.)</li>
          </ul>
        </section>

        {/* ÉTAPES */}
        <div className="space-y-12">

          {/* ÉTAPE 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans">
              1. Créer un Projet
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Depuis votre dashboard, créez un nouveau projet. Cela génère automatiquement deux clés :
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Clé Publique</p>
                <code className="text-[11px] font-mono text-blue-700">pk_abc123...</code>
                <p className="text-xs text-slate-500 mt-2">Utilisée dans votre frontend pour register/login/OAuth.</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">Clé Secrète</p>
                <code className="text-[11px] font-mono text-amber-700">sk_abc123...</code>
                <p className="text-xs text-slate-500 mt-2">Utilisée uniquement dans votre backend pour les opérations admin.</p>
              </div>
            </div>
          </section>

          {/* ÉTAPE 2 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2 font-sans">
              <Terminal className="h-5 w-5 text-slate-400" />
              2. Installer le SDK
            </h2>
            <CodeBlock id="step2" code="npm install @vaultsecure/js" />
          </section>

          {/* ÉTAPE 3 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans">
              3. Initialiser le Client
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              Créez une instance avec votre clé publique. Elle peut être exposée dans votre frontend sans risque.
            </p>
            <CodeBlock
              id="step3"
              code={`import { SecureVault } from '@vaultsecure/js'

export const vault = new SecureVault({
  publicKey: 'pk_votre_cle_publique',
  baseUrl: 'https://api.securevault.com'
})`}
            />
          </section>

          {/* ÉTAPE 4 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans">
              4. Inscrire un utilisateur
            </h2>
            <CodeBlock
              id="step4"
              code={`const user = await vault.signUp({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'MotDePasse123'
})

console.log('Inscrit :', user.email)`}
            />
          </section>

          {/* ÉTAPE 5 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans">
              5. Connecter un utilisateur
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              Authentifiez via email/password ou OAuth (Google, GitHub).
            </p>
            <CodeBlock
              id="step5"
              code={`// Email & password
const user = await vault.signIn({
  email: 'john@example.com',
  password: 'MotDePasse123'
})
console.log('Connecté :', user.firstName)

// Google OAuth
vault.signInWithGoogle()

// GitHub OAuth
vault.signInWithGithub()`}
            />
          </section>

          {/* ÉTAPE 6 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans">
              6. Gérer le callback OAuth
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              Créez une page <code className="bg-slate-100 px-1 rounded text-xs">/auth/callback</code> dans votre app pour récupérer le token après connexion OAuth.
            </p>
            <CodeBlock
              id="step6"
              code={`// Sur la page /auth/callback de votre app
const result = vault.handleOAuthCallback()
if (result) {
  console.log('Connecté via OAuth :', result.email)
  // result.token, result.firstName, result.lastName
}`}
            />
          </section>

          {/* ÉTAPE 7 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans">
              7. Reset de mot de passe
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              Permettez à vos utilisateurs de réinitialiser leur mot de passe par email.
            </p>
            <CodeBlock
              id="step7"
              code={`// Envoyer l'email de reset
await vault.forgotPassword('john@example.com')

// Réinitialiser avec le token reçu par email
await vault.resetPassword('token_recu', 'NouveauMotDePasse123')`}
            />
          </section>

          {/* ÉTAPE 8 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-sans">
              8. Gérer la session
            </h2>
            <CodeBlock
              id="step8"
              code={`// Vérifier si connecté
if (vault.isSignedIn()) {
  const user = vault.getUser()
  console.log('Bonjour', user.firstName)
}

// Déconnecter
vault.signOut()`}
            />
          </section>

          {/* ÉTAPE 9 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-sans">
              9. SDK Admin (backend uniquement)
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              Utilisez la <strong>clé secrète</strong> pour gérer vos utilisateurs depuis votre serveur. Ne jamais exposer côté client.
            </p>
            <CodeBlock
              id="step9"
              code={`import { VaultAdmin } from '@vaultsecure/js'

const admin = new VaultAdmin(
  'sk_votre_cle_secrete',
  'https://api.securevault.com'
)

// Lister les utilisateurs
const users = await admin.getUsers()

// Vérifier un token JWT
const result = await admin.verifyToken('eyJhbGci...')
if (result.valid) {
  console.log('Token valide pour :', result.email)
}

// Désactiver / Réactiver / Supprimer
await admin.disableUser('user@example.com')
await admin.enableUser('user@example.com')
await admin.deleteUser('user@example.com')`}
            />
          </section>
        </div>

        {/* ÉTAPES SUIVANTES */}
        <section className="mt-16 rounded-2xl bg-blue-50/50 p-8 border border-blue-100">
          <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2 font-sans">
            <Lightbulb className="h-5 w-5" />
            Étapes suivantes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Référence API', href: '/docs/api' },
              { label: 'Guides Intégration', href: '/docs/integration' },
              { label: 'Meilleures pratiques', href: '/docs/security' },
              { label: 'Configuration Webhooks', href: '/docs/webhooks' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-xl bg-white p-4 text-sm font-semibold text-blue-700 shadow-sm border border-blue-100/50 hover:shadow-md transition-all group no-underline"
              >
                {item.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>

        {/* SUPPORT */}
        <footer className="mt-16 border-t border-slate-200 pt-8 text-center pb-12">
          <h2 className="text-lg font-bold mb-2 font-sans text-slate-900">
            Besoin d'aide ?
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Notre équipe est disponible pour vous accompagner dans votre intégration.
          </p>
          <div className="flex justify-center">
            {/* Correction : Ajout de la balise <a> ouvrante */}
            <a 
              href="mailto:Aglanelom0@gmail.com"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#004a80] transition-colors no-underline"
            >
              <Mail className="h-4 w-4" />
              Aglanelom0@gmail.com
            </a>
          </div>
        </footer>

      </motion.div>
    </div>
  )
}                    