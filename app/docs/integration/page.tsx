'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Copy, Check, Layers, Rocket, ChevronRight
} from 'lucide-react'

export default function IntegrationGuidePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const stacks = [
    { name: 'Next.js', id: 'nextjs' },
    { name: 'React', id: 'react' },
    { name: 'Vue.js', id: 'vue' },
    { name: 'Node.js', id: 'node' },
    { name: 'JavaScript', id: 'vanilla' },
  ]

  const steps = [
    {
      title: "Installer le SDK",
      desc: "Un seul package pour tous les frameworks JavaScript.",
      code: "npm install @vaultsecure/js"
    },
    {
      title: "Initialiser le client",
      desc: "Créez une instance avec votre clé publique disponible dans votre dashboard.",
      code: `import { SecureVault } from '@vaultsecure/js'

export const vault = new SecureVault({
  publicKey: 'pk_votre_cle_publique',
  baseUrl: 'https://api.securevault.com'
})`
    },
    {
      title: "Inscrire un utilisateur",
      desc: "Créez un compte pour un nouvel utilisateur.",
      code: `const user = await vault.signUp({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'MotDePasse123'
})
console.log('Inscrit :', user.email)`
    },
    {
      title: "Connecter un utilisateur",
      desc: "Authentifiez un utilisateur existant.",
      code: `const user = await vault.signIn({
  email: 'john@example.com',
  password: 'MotDePasse123'
})
console.log('Connecté :', user.firstName)`
    },
    {
      title: "Gérer la session",
      desc: "Récupérez l'utilisateur connecté et gérez la déconnexion.",
      code: `// Vérifier si connecté
if (vault.isSignedIn()) {
  const user = vault.getUser()
  console.log('Bonjour', user.firstName)
}

// Déconnecter
vault.signOut()`
    },
    {
      title: "SDK Admin (backend uniquement)",
      desc: "Gérez vos utilisateurs depuis votre serveur avec la clé secrète. Ne jamais exposer côté client.",
      code: `import { VaultAdmin } from '@vaultsecure/js'

const admin = new VaultAdmin(
  'sk_votre_cle_secrete',
  'https://api.securevault.com'
)

// Lister les utilisateurs
const users = await admin.getUsers()

// Vérifier un token
const result = await admin.verifyToken('eyJhbGci...')

// Désactiver / Réactiver / Supprimer
await admin.disableUser('user@example.com')
await admin.enableUser('user@example.com')
await admin.deleteUser('user@example.com')`
    },
  ]

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
            Frameworks
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4 font-sans">
            Guide d'Intégration
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Connectez SecureVault à votre stack en quelques minutes avec le SDK <code className="text-blue-600 bg-blue-50 px-1 rounded text-base">@vaultsecure/js</code>.
          </p>
        </header>

        {/* STACKS */}
        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {stacks.map((stack) => (
            <div
              key={stack.id}
              className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm hover:border-blue-200 transition-colors cursor-pointer group"
            >
              <span className="text-sm font-semibold text-slate-700">{stack.name}</span>
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
          ))}
        </div>

        {/* ÉTAPES */}
        <section>
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2 font-sans">
            <Layers className="h-5 w-5 text-blue-500" />
            Installation pas à pas
          </h2>

          <div className="space-y-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white shadow">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-md font-bold text-slate-800 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">{step.desc}</p>
                  <div className="relative group">
                    <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-slate-100 text-[13px] leading-relaxed">
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
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-blue-100 bg-blue-50/30 p-8 mt-12">
          <h2 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Prêt pour le déploiement ?
          </h2>
          <p className="text-sm text-blue-700/80 mb-6">
            Une fois l'intégration terminée, retrouvez vos clés et statistiques dans votre dashboard.
          </p>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
            Aller au Dashboard
          </button>
        </section>

      </motion.div>
    </div>
  )
}