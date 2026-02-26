'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Key, Copy, Check, Eye, EyeOff, ShieldCheck, 
  Plus, ChevronRight, MousePointerClick, Lock
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useProjectStore } from '@/store/projectStore'
import { appToast } from '@/lib/toast'

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ')

export default function ApiKeysPage() {
  const router = useRouter()
  const { projects, fetchProjects, isLoading, error } = useProjectStore()

  const [selectedProjectId, setSelectedProjectId] = useState<string | number | null>(null)
  const [showSecret, setShowSecret] = useState(false)
  const [copiedType, setCopiedType] = useState<'pk' | 'sk' | null>(null)

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])

  const selectedProject = useMemo(() => 
    projects.find(p => p.id === selectedProjectId), 
  [projects, selectedProjectId])

  const copyToClipboard = async (text: string, type: 'pk' | 'sk') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2000)
      appToast.success('Copié !', 'Clé prête à être collée.')
    } catch {
      appToast.error('Erreur', 'Accès au presse-papiers refusé.')
    }
  }

  return (
    <div className="max-w-[1100px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            Identifiants API
          </h1>
          <p className="text-muted-foreground text-sm">
            Sélectionnez une application pour gérer ses clés d'accès.
          </p>
        </div>
        <Button onClick={() => router.push('/first_app')} size="sm">
          <Plus className="mr-2 h-4 w-4" /> Nouveau Projet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* LISTE DES PROJETS (4/12) */}
        <div className="md:col-span-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
            Vos Applications ({projects.length})
          </p>
          <div className="space-y-2">
            {isLoading ? (
              [1, 2, 3].map(i => <div key={i} className="h-14 w-full bg-muted/50 animate-pulse rounded-xl" />)
            ) : (
              projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    setSelectedProjectId(project.id)
                    setShowSecret(false)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 group",
                    selectedProjectId === project.id 
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]" 
                      : "bg-card border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div 
                      className={cn(
                        "h-2 w-2 rounded-full shrink-0 ring-4",
                        selectedProjectId === project.id ? "bg-white ring-white/20" : "ring-transparent"
                      )}
                      style={selectedProjectId !== project.id ? { backgroundColor: project.primaryColor } : {}} 
                    />
                    <span className="text-sm font-bold truncate">{project.name}</span>
                  </div>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform opacity-50",
                    selectedProjectId === project.id ? "rotate-90 opacity-100" : "group-hover:translate-x-1"
                  )} />
                </button>
              ))
            )}
          </div>
        </div>

        {/* ZONE D'AFFICHAGE (8/12) */}
        <div className="md:col-span-8 min-h-[400px]">
          {!selectedProject ? (
            /* --- ETAT VIDE (L'INDICATEUR UX) --- */
            <div className="h-full flex flex-col items-center justify-center border-2 border-dashed rounded-3xl bg-muted/5 p-12 text-center animate-in zoom-in-95 duration-300">
              <div className="relative mb-6">
                <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl animate-pulse" />
                <MousePointerClick className="h-12 w-12 text-primary relative z-10" />
              </div>
              <h3 className="text-lg font-bold">Aucune sélection</h3>
              <p className="text-muted-foreground text-sm max-w-[280px] mt-2">
                Cliquez sur un projet dans la liste de gauche pour afficher ses clés publiques et secrètes.
              </p>
            </div>
          ) : (
            /* --- AFFICHAGE DES CLES --- */
            <Card className="p-8 border-border shadow-xl animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div 
                  className="h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-inner"
                  style={{ backgroundColor: selectedProject.primaryColor }}
                >
                  <Key className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold leading-none">{selectedProject.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">Identifiants de sécurité</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Clé Publique */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-[11px] font-black uppercase tracking-tighter text-muted-foreground">Public Key</label>
                    <Badge variant="secondary" className="text-[10px]">Côté Client</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      readOnly 
                      value={selectedProject.publicKey}
                      className="font-mono text-xs bg-muted/30 border-none h-11 focus-visible:ring-1 ring-primary/20"
                    />
                    <Button 
                      variant="outline" 
                      className="h-11 px-4 border-muted hover:bg-primary hover:text-white transition-all"
                      onClick={() => copyToClipboard(selectedProject.publicKey, 'pk')}
                    >
                      {copiedType === 'pk' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Clé Secrète */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-[11px] font-black uppercase tracking-tighter text-muted-foreground">Secret Key</label>
                    <Badge className="text-[10px] bg-red-500/10 text-red-600 hover:bg-red-500/10 border-none">Serveur Uniquement</Badge>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input 
                        readOnly 
                        type={showSecret ? "text" : "password"}
                        value={selectedProject.secretKey}
                        className="font-mono text-xs bg-muted/30 border-none h-11 pr-12 focus-visible:ring-1 ring-primary/20"
                      />
                      <button 
                        onClick={() => setShowSecret(!showSecret)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <Button 
                      variant="outline" 
                      className="h-11 px-4 border-muted hover:bg-primary hover:text-white transition-all"
                      onClick={() => copyToClipboard(selectedProject.secretKey, 'sk')}
                    >
                      {copiedType === 'sk' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex gap-3">
                <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0" />
                <p className="text-[12px] text-amber-900 leading-snug">
                  La <b>Secret Key</b> permet un accès complet à vos données. Ne l'exposez jamais dans un fichier JS côté navigateur ou sur une application mobile.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}