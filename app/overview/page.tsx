'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal, 
  Copy, 
  Check, 
  ChevronRight, 
  Code2, 
  BookOpen, 
  Cpu,
  Layers
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// --- DONNÉES DE DOCUMENTATION ---
const FRAMEWORKS = [
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'Framework React pour le web.',
    install: 'npm install @securevault/nextjs',
    setup: "import { VaultProvider } from '@securevault/nextjs'\n\nexport default function App({ Component, pageProps }) {\n  return (\n    <VaultProvider appId='YOUR_APP_ID'>\n      <Component {...pageProps} />\n    </VaultProvider>\n  )\n}",
    icon: 'https://cdn.worldvectorlogo.com/logos/next-js.svg'
  },
  {
    id: 'react',
    name: 'React',
    description: 'Bibliothèque UI standard.',
    install: 'npm install @securevault/react',
    setup: "import { SecureVault } from '@securevault/react'\n\nconst vault = new SecureVault('YOUR_API_KEY');",
    icon: 'https://cdn.worldvectorlogo.com/logos/react-2.svg'
  },
  {
    id: 'node',
    name: 'Node.js (Backend)',
    description: 'SDK Serveur pour API sécurisées.',
    install: 'npm install @securevault/node',
    setup: "const Vault = require('@securevault/node');\nconst client = new Vault.Client({ secret: process.env.VAULT_SECRET });",
    icon: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg'
  },
  {
    id: 'python',
    name: 'Python / Django',
    description: 'Intégration backend Python.',
    install: 'pip install securevault-python',
    setup: "from securevault import VaultClient\n\nclient = VaultClient(api_key='your_key')",
    icon: 'https://cdn.worldvectorlogo.com/logos/python-5.svg'
  }
]

export default function DocumentationPage() {
  const [selectedId, setSelectedId] = useState(FRAMEWORKS[0].id)
  const [copied, setCopied] = useState(false)

  const activeTech = FRAMEWORKS.find(f => f.id === selectedId) || FRAMEWORKS[0]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-screen">
        
        {/* BARRE LATÉRALE GAUCHE : LISTE DES FRAMEWORKS */}
        <aside className="lg:col-span-4 bg-white border-r border-slate-200 p-8 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-3">
              <Layers className="h-4 w-4" />
              SDKs & Libs
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Intégrations
            </h1>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Choisissez votre technologie pour obtenir les instructions d'installation.
            </p>
          </div>

          <nav className="space-y-2">
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
                    selectedId === tech.id ? "border-blue-200 scale-105" : "border-slate-100 grayscale opacity-70 group-hover:grayscale-0"
                  )}>
                    <img src={tech.icon} alt={tech.name} className="h-6 w-6 object-contain" />
                  </div>
                  <div className="text-left">
                    <p className={cn(
                      "font-bold text-sm",
                      selectedId === tech.id ? "text-blue-900" : "text-slate-600"
                    )}>{tech.name}</p>
                    <p className="text-[11px] text-slate-400 font-medium">{tech.description}</p>
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

        {/* SECTION DROITE : DOCUMENTATION DYNAMIQUE */}
        <main className="lg:col-span-8 p-8 lg:p-16 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl space-y-10"
            >
              {/* Header de Doc */}
              <div className="space-y-4">
                <div className="h-14 w-14 bg-white rounded-2xl border-2 border-slate-100 flex items-center justify-center shadow-sm">
                   <img src={activeTech.icon} alt="" className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                  Utiliser avec {activeTech.name}
                </h2>
                <p className="text-lg text-slate-500 leading-relaxed italic">
                  "Sécurisez votre application {activeTech.name} en moins de 2 minutes."
                </p>
              </div>

              {/* Étape 1 : Installation */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">1</div>
                  <h3 className="text-xl font-bold text-slate-800">Installation du package</h3>
                </div>
                
                <div className="relative group">
                  <div className="absolute top-4 left-4 text-slate-500">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <pre className="bg-slate-900 text-slate-100 p-6 pt-12 rounded-2xl font-mono text-sm overflow-x-auto shadow-xl">
                    <code>{activeTech.install}</code>
                  </pre>
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-slate-300 border-none h-8 rounded-lg text-xs"
                    onClick={() => copyToClipboard(activeTech.install)}
                  >
                    {copied ? <Check className="h-3 w-3 text-green-400 mr-2" /> : <Copy className="h-3 w-3 mr-2" />}
                    {copied ? 'Copié !' : 'Copier'}
                  </Button>
                </div>
              </div>

              {/* Étape 2 : Configuration */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">2</div>
                  <h3 className="text-xl font-bold text-slate-800">Initialisation</h3>
                </div>
                <p className="text-slate-500 text-sm">
                  Ajoutez ce bloc de code pour connecter votre projet à l'API de SecureVault.
                </p>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2">
                       <Code2 className="h-3 w-3" /> main.ts
                     </span>
                  </div>
                  <pre className="p-6 font-mono text-sm text-slate-700 leading-relaxed overflow-x-auto">
                    <code>{activeTech.setup}</code>
                  </pre>
                </div>
              </div>

              {/* Aide supplémentaire */}
              <Card className="p-6 bg-blue-600 border-none rounded-3xl text-white shadow-lg shadow-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Besoin de plus de détails ?</h4>
                    <p className="text-blue-100 text-xs">Consultez la documentation complète de l'API.</p>
                  </div>
                </div>
                <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl px-6">
                  Voir tout
                </Button>
              </Card>

            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  )
}