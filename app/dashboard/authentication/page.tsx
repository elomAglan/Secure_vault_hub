'use client'

import { ComponentType, useEffect, useMemo, useState } from 'react'
import { 
  Mail, Github, Wand2, ShieldCheck, Save, 
  ChevronRight, Fingerprint, LayoutGrid, 
  LockKeyhole, Zap
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useProjectStore } from '@/store/projectStore'
import type { AuthProvider } from '@/types/project'
import { appToast } from '@/lib/toast'

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ')

type AuthMethod = {
  name: string
  description: string
  icon: ComponentType<{ className?: string }>
  provider?: AuthProvider
  supported: boolean
}

const authMethods: AuthMethod[] = [
  {
    name: 'Email & Password',
    description: 'Authentification classique avec validation sécurisée.',
    icon: Mail,
    provider: 'PASSWORD',
    supported: true,
  },
  {
    name: 'Google Login',
    description: 'Connexion rapide via les comptes Google.',
    icon: GoogleIcon,
    provider: 'GOOGLE',
    supported: true,
  },
  {
    name: 'GitHub Connector',
    description: 'Idéal pour les développeurs et outils tech.',
    icon: Github,
    provider: 'GITHUB',
    supported: true,
  },
  {
    name: 'Magic Links',
    description: 'Connexion sans mot de passe via lien email.',
    icon: Wand2,
    supported: false,
  },
  {
    name: 'Biométrie / Passkeys',
    description: 'FaceID, TouchID ou clés physiques.',
    icon: Fingerprint,
    supported: false,
  },
  {
    name: 'Two-Factor (2FA)',
    description: 'Couche de sécurité TOTP supplémentaire.',
    icon: ShieldCheck,
    supported: false,
  },
]

export default function AuthenticationPage() {
  const { projects, fetchProjects, updateProject, isLoading } = useProjectStore()
  const [selectedId, setSelectedId] = useState<string>('')
  const [providers, setProviders] = useState<AuthProvider[]>(['PASSWORD'])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => { void fetchProjects() }, [fetchProjects])

  useEffect(() => {
    if (projects.length && !selectedId) setSelectedId(String(projects[0].id))
  }, [projects, selectedId])

  const selectedProject = useMemo(() => projects.find((p) => String(p.id) === selectedId), [projects, selectedId])

  useEffect(() => {
    if (selectedProject) setProviders(selectedProject.authProviders)
  }, [selectedProject])

  const toggleProvider = (provider: AuthProvider) => {
    if (provider === 'PASSWORD') return
    setProviders(prev => prev.includes(provider) ? prev.filter(p => p !== provider) : [...prev, provider])
  }

  const handleSave = async () => {
    if (!selectedProject) return
    setIsSaving(true)
    try {
      await updateProject(selectedProject.id, { ...selectedProject, authProviders: providers })
      appToast.success('Modifications enregistrées')
    } catch {
      appToast.error('Erreur lors de la sauvegarde')
    } finally { setIsSaving(false) }
  }

  return (
    <div className="max-w-[1100px] mx-auto space-y-8 animate-in fade-in duration-700 pb-12">
      
      {/* HEADER - Plus de blanc, moins de contraste */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-xl">
              <LockKeyhole className="h-6 w-6 text-slate-400" />
            </div>
            Authentification
          </h1>
          <p className="text-slate-500 text-sm mt-1">Configurez les méthodes d'accès pour vos utilisateurs.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving || !selectedProject} 
          className="rounded-full px-6 shadow-md hover:shadow-lg transition-all"
        >
          <Save className="mr-2 h-4 w-4" /> {isSaving ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* SÉLECTEUR DE PROJET (GAUCHE) */}
        <div className="md:col-span-4 space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 px-1">Projet sélectionné</p>
          <div className="space-y-2">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(String(p.id))}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left",
                  selectedId === String(p.id) 
                    ? "bg-white border-primary/20 shadow-xl shadow-slate-200/50 ring-1 ring-primary/5" 
                    : "bg-transparent border-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div 
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      selectedId === String(p.id) ? "bg-primary scale-125 shadow-[0_0_8px_rgba(var(--primary),0.4)]" : "bg-slate-300"
                    )} 
                  />
                  <span className={cn("text-sm font-medium", selectedId === String(p.id) && "font-bold text-slate-900")}>
                    {p.name}
                  </span>
                </div>
                <ChevronRight className={cn("h-4 w-4 transition-all", selectedId === String(p.id) ? "text-primary opacity-100" : "opacity-0")} />
              </button>
            ))}
          </div>
        </div>

        {/* MÉTHODES D'AUTH (DROITE) */}
        <div className="md:col-span-8 space-y-4">
          {!selectedProject ? (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
                <LayoutGrid className="h-10 w-10 text-slate-200 mb-4" />
                <p className="text-slate-400 text-sm">Sélectionnez une application à gauche.</p>
              </div>
          ) : (
            authMethods.map((method) => {
              const Icon = method.icon
              const isEnabled = method.provider ? providers.includes(method.provider) : false
              const isDefault = method.provider === 'PASSWORD'

              return (
                <Card key={method.name} className={cn(
                  "group relative overflow-hidden border-slate-100 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md",
                  isEnabled ? "bg-white ring-1 ring-primary/5 border-primary/10" : "bg-slate-50/20"
                )}>
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                        isEnabled ? "bg-primary text-white shadow-lg shadow-primary/20 rotate-0" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className={cn("text-sm font-semibold tracking-tight", isEnabled ? "text-slate-900" : "text-slate-600")}>
                            {method.name}
                          </h3>
                          {!method.supported && <Badge variant="secondary" className="text-[8px] h-4 bg-slate-100 text-slate-400 border-none">Bientôt</Badge>}
                          {isDefault && <Badge className="text-[8px] h-4 bg-blue-50 text-blue-500 border-none">Défaut</Badge>}
                        </div>
                        <p className="text-xs text-slate-400 max-w-[320px] leading-relaxed italic">{method.description}</p>
                      </div>
                    </div>
                    
                    <Switch
                      checked={isEnabled}
                      disabled={!method.supported || isDefault || isSaving}
                      onCheckedChange={() => method.provider && toggleProvider(method.provider)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </Card>
              )
            })
          )}

          {/* FOOTER INFO - Subtil et clair */}
          <div className="flex items-center gap-4 p-5 bg-blue-50/30 rounded-2xl border border-blue-100/50 mt-6">
            <Zap className="h-5 w-5 text-blue-400 shrink-0" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Pour Google et GitHub, assurez-vous d'avoir configuré les <span className="font-semibold text-slate-700 underline underline-offset-2">Redirect URIs</span> dans vos consoles développeurs respectives.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}