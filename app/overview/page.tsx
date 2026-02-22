'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal, 
  Copy, 
  Check, 
  ChevronRight, 
  Code2, 
  Layers,
  LayoutDashboard,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const FRAMEWORKS = [
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: '/icons/icons8-next.js-48.png'
  },
  {
    id: 'react',
    name: 'React',
    icon: '/icons/icons8-react-80.png'
  },
  {
    id: 'node',
    name: 'Node.js',
    icon: '/icons/icons8-node-js-48.png'
  },
  {
    id: 'python',
    name: 'Python / Django',
    icon: '/icons/icons8-python-48.png'
  },
  {
    id: 'vanilla',
    name: 'JavaScript',
    icon: '/icons/vanila icon.png'
  }
]

const INSTALL_CMD = 'npm install @vaultsecure/js'

const SETUP_CODE = `import { SecureVault } from '@vaultsecure/js'

// Initialiser avec votre clé publique
const vault = new SecureVault({
  publicKey: 'pk_votre_cle_publique',
  baseUrl: 'https://api.securevault.com'
})

// Inscription
await vault.signUp({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'MotDePasse123'
})

// Connexion
await vault.signIn({
  email: 'john@example.com',
  password: 'MotDePasse123'
})

// Récupérer l'utilisateur connecté
const user = vault.getUser()

// Vérifier si connecté
const isConnected = vault.isSignedIn()

// Déconnexion
vault.signOut()`

const METHODS = [
  { method: 'vault.signUp()', desc: 'Créer un compte utilisateur' },
  { method: 'vault.signIn()', desc: 'Connecter un utilisateur' },
  { method: 'vault.signOut()', desc: 'Déconnecter l\'utilisateur' },
  { method: 'vault.getUser()', desc: 'Récupérer l\'utilisateur connecté' },
  { method: 'vault.isSignedIn()', desc: 'Vérifier si connecté' },
]

export default function DocumentationPage() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState(FRAMEWORKS[0].id)
  const [copiedInstall, setCopiedInstall] = useState(false)
  const [copiedSetup, setCopiedSetup] = useState(false)

  const activeTech = FRAMEWORKS.find(f => f.id === selectedId) || FRAMEWORKS[0]

  const copyInstall = () => {
    navigator.clipboard.writeText(INSTALL_CMD)
    setCopiedInstall(true)
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const copySetup = () => {
    navigator.clipboard.writeText(SETUP_CODE)
    setCopiedSetup(true)
    setTimeout(() => setCopiedSetup(false), 2000)
  }

  return (
    <div className="h-screen overflow-hidden bg-[#F9FAFB] text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto flex h-full border-x border-slate-200 bg-white">
        
        {/* BARRE LATÉRALE GAUCHE */}
        <aside className="w-[380px] flex-shrink-0 border-r border-slate-200 p-8 flex flex-col">
          <div className="mb-10">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-3">
              <Layers className="h-4 w-4" />
              SDKs & Libs
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Intégrations
            </h1>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Le SDK est identique pour tous les frameworks. Choisissez le vôtre pour un aperçu adapté.
            </p>

            <div className="mt-4 flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl w-fit">
              <Terminal className="h-3 w-3 text-blue-400" />
              <span className="text-xs font-mono font-bold">@vaultsecure/js</span>
            </div>
          </div>

          <nav className="space-y-2 overflow-y-auto pr-2">
            {FRAMEWORKS.map((tech) => (
              <button
                key={tech.id}
                onClick={() => setSelectedId(tech.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group border-2",
                  selectedId === tech.id 
                    ? "bg-blue-50 border-blue-100 shadow-sm" 
                    : "bg-white border-transparent hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center transition-all bg-white border shadow-sm",
                    selectedId === tech.id 
                      ? "border-blue-200 scale-105" 
                      : "border-slate-100 grayscale opacity-70 group-hover:grayscale-0"
                  )}>
                    <img src={tech.icon} alt={tech.name} className="h-7 w-7 object-contain" />
                  </div>
                  <div className="text-left">
                    <p className={cn(
                      "font-bold text-sm",
                      selectedId === tech.id ? "text-blue-900" : "text-slate-600"
                    )}>{tech.name}</p>
                    <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                      {tech.id}
                    </p>
                  </div>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  selectedId === tech.id ? "text-blue-600 translate-x-1" : "text-slate-300"
                )} />
              </button>
            ))}
          </nav>
        </aside>

        {/* SECTION DROITE */}
        <main className="flex-1 overflow-y-auto bg-slate-50/30">
          <div className="p-8 lg:p-16 max-w-4xl mx-auto">
            
            <div className="flex justify-end mb-12">
              <Button 
                onClick={() => router.push('/overview')}
                className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 h-12 px-6 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-sm"
              >
                <LayoutDashboard className="h-4 w-4 text-blue-600" />
                Aller au Dashboard
              </Button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <div className="h-20 w-20 bg-white rounded-3xl border-2 border-slate-100 flex items-center justify-center shadow-md">
                    <img src={activeTech.icon} alt="" className="h-10 w-10 object-contain" />
                  </div>
                  <h2 className="text-5xl font-black text-slate-900 tracking-tight">
                    Utiliser avec {activeTech.name}
                  </h2>
                  <p className="text-lg text-slate-500 leading-relaxed italic border-l-4 border-blue-200 pl-4 bg-blue-50/30 py-2">
                    "Un seul SDK, tous les frameworks. Sécurisez votre app en moins de 2 minutes."
                  </p>
                </div>

                {/* Étape 1 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-lg">1</div>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Installation du package</h3>
                  </div>
                  <div className="relative group">
                    <div className="absolute top-4 left-4 text-slate-500">
                      <Terminal className="h-4 w-4" />
                    </div>
                    <pre className="bg-slate-900 text-slate-100 p-6 pt-12 rounded-3xl font-mono text-sm overflow-x-auto shadow-2xl border border-white/5">
                      <code className="text-blue-400">$ <span className="text-slate-100">{INSTALL_CMD}</span></code>
                    </pre>
                    <Button 
                      variant="secondary"
                      size="sm"
                      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white border-none h-8 rounded-lg text-xs backdrop-blur-sm"
                      onClick={copyInstall}
                    >
                      {copiedInstall ? <Check className="h-3 w-3 text-green-400 mr-2" /> : <Copy className="h-3 w-3 mr-2" />}
                      {copiedInstall ? 'Copié !' : 'Copier'}
                    </Button>
                  </div>
                </div>

                {/* Étape 2 */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-lg">2</div>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Initialisation & utilisation</h3>
                  </div>
                  <div className="bg-white border-2 border-slate-100 rounded-3xl overflow-hidden shadow-xl">
                    <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2">
                        <Code2 className="h-4 w-4" /> Configuration du SDK
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-3 text-xs text-slate-500 hover:text-slate-900"
                        onClick={copySetup}
                      >
                        {copiedSetup ? <Check className="h-3 w-3 text-green-500 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                        {copiedSetup ? 'Copié !' : 'Copier'}
                      </Button>
                    </div>
                    <pre className="p-8 font-mono text-sm text-slate-700 leading-relaxed overflow-x-auto bg-white">
                      <code>{SETUP_CODE}</code>
                    </pre>
                  </div>
                </div>

                {/* Étape 3 */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-lg">3</div>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Méthodes disponibles</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {METHODS.map((item) => (
                      <div key={item.method} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                        <p className="font-mono text-sm font-bold text-blue-600">{item.method}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BAS */}
                <div className="pt-12 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 pb-12">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shadow-inner">
                      <Check className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-sm">Installation terminée ?</p>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Votre application est prête.</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => router.push('/overview')}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-10 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-200 w-full sm:w-auto"
                  >
                    Aller au Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}