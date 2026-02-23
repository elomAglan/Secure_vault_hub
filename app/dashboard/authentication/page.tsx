'use client'

import { ComponentType, useEffect, useMemo, useState } from 'react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Mail, Github, Wand2, Lock } from 'lucide-react'

import { useProjectStore } from '@/store/projectStore'
import type { AuthProvider } from '@/types/project'
import { appToast } from '@/lib/toast'

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.896 4.14-1.236 1.236-3.156 2.472-7.104 2.472-6.24 0-11.232-5.064-11.232-11.304s4.992-11.304 11.232-11.304c3.42 0 6.036 1.344 7.92 3.144l2.256-2.256C18.42 1.152 15.528 0 12.48 0 5.676 0 0 5.7 0 12.6s5.676 12.6 12.48 12.6c3.684 0 6.468-1.2 8.652-3.48 2.244-2.244 2.952-5.412 2.952-7.944 0-.768-.06-1.5-.18-2.184H12.48z" />
  </svg>
)

type AuthMethod = {
  name: string
  description: string
  icon: ComponentType<{ className?: string }>
  provider?: AuthProvider
  supported: boolean
}

const authMethods: AuthMethod[] = [
  {
    name: 'Email & Mot de passe',
    description: 'Permettre aux utilisateurs de s\'inscrire et de se connecter avec un email et un mot de passe',
    icon: Mail,
    provider: 'PASSWORD',
    supported: true,
  },
  {
    name: 'Google OAuth',
    description: 'Permettre aux utilisateurs de se connecter via leur compte Google',
    icon: GoogleIcon,
    provider: 'GOOGLE',
    supported: true,
  },
  {
    name: 'GitHub OAuth',
    description: 'Permettre aux utilisateurs de se connecter via leur compte GitHub',
    icon: Github,
    provider: 'GITHUB',
    supported: true,
  },
  {
    name: 'Magic Links',
    description: 'Envoyer des liens de connexion magiques sans mot de passe par email',
    icon: Wand2,
    supported: false,
  },
  {
    name: 'Authentification à deux facteurs',
    description: 'Exiger un second facteur pour vérifier l\'identité de l\'utilisateur',
    icon: Lock,
    supported: false,
  },
]

const isAuthProvider = (value: string): value is AuthProvider =>
  value === 'PASSWORD' || value === 'GOOGLE' || value === 'GITHUB'

export default function AuthenticationPage() {
  const {
    projects,
    fetchProjects,
    updateProject,
    isLoading,
    error,
  } = useProjectStore()

  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [providers, setProviders] = useState<AuthProvider[]>(['PASSWORD'])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])

  useEffect(() => {
    if (!projects.length) return
    if (!selectedProjectId) setSelectedProjectId(String(projects[0].id))
  }, [projects, selectedProjectId])

  const selectedProject = useMemo(
    () => projects.find((p) => String(p.id) === selectedProjectId),
    [projects, selectedProjectId]
  )

  useEffect(() => {
    if (!selectedProject) return

    const projectProviders = selectedProject.authProviders.filter(isAuthProvider)
    const nextProviders: AuthProvider[] = projectProviders.includes('PASSWORD')
      ? projectProviders
      : ['PASSWORD', ...projectProviders]

    setProviders(nextProviders)
  }, [selectedProject])

  const toggleProvider = (provider: AuthProvider) => {
    if (provider === 'PASSWORD') return

    setProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    )
  }

  const handleSave = async () => {
    if (!selectedProject) return

    setIsSaving(true)
    try {
      await updateProject(selectedProject.id, {
        name: selectedProject.name,
        authProviders: providers,
        theme: selectedProject.theme,
        primaryColor: selectedProject.primaryColor,
      })
      appToast.success('Paramètres d\'authentification mis à jour')
    } catch {
      appToast.error('Échec de la mise à jour des paramètres')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Paramètres d'Authentification</h1>
        <p className="mt-2 text-foreground/60">
          Configurez les méthodes d'authentification disponibles pour votre application
        </p>
      </div>

      <Card className="border border-border p-6">
        <Label className="mb-2 block">Projet</Label>
        <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
          <SelectTrigger className="max-w-md">
            <SelectValue placeholder="Sélectionnez un projet" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={String(project.id)}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {authMethods.map((method) => {
          const Icon = method.icon
          const isEnabled = method.provider ? providers.includes(method.provider) : false
          const isPasswordMethod = method.provider === 'PASSWORD'

          return (
            <Card key={method.name} className="border border-border p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">{method.name}</h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      {method.description}
                    </p>
                    <div className="mt-2">
                      {!method.supported ? (
                        <Badge variant="secondary">Service non intégré</Badge>
                      ) : isEnabled ? (
                        <Badge>Activé</Badge>
                      ) : (
                        <Badge variant="secondary">Désactivé</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Switch
                  checked={isEnabled}
                  onCheckedChange={() => method.provider && toggleProvider(method.provider)}
                  disabled={!method.supported || isPasswordMethod || !selectedProject || isLoading || isSaving}
                />
              </div>
            </Card>
          )
        })}
      </div>

      <div className="rounded-lg border border-border bg-background/50 p-4">
        <p className="text-sm text-foreground/60">
          Seules les méthodes ayant un service backend disponible sont connectées dans cette page.
        </p>
      </div>

      <Button onClick={() => void handleSave()} disabled={!selectedProject || isLoading || isSaving}>
        {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
      </Button>
    </div>
  )
}