'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Settings, MoreVertical, Trash2, Copy, Check, Key } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useProjectStore } from '@/store/projectStore'
import type { Project } from '@/app/services/projectService'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function ProjectsPage() {
  const router = useRouter()
  const { projects, fetchProjects, deleteProject, isLoading, error } = useProjectStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [projectToView, setProjectToView] = useState<Project | null>(null)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const [deleteConfirmName, setDeleteConfirmName] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const openSettingsDialog = (project: Project) => {
    setProjectToView(project)
  }

  const closeSettingsDialog = () => {
    setProjectToView(null)
  }

  const openDeleteDialog = (project: Project) => {
    setProjectToDelete(project)
    setDeleteConfirmName('')
  }

  const closeDeleteDialog = () => {
    if (isDeleting) return
    setProjectToDelete(null)
    setDeleteConfirmName('')
  }

  const handleDelete = async () => {
    if (!projectToDelete) return
    if (deleteConfirmName.trim() !== projectToDelete.name) return

    setIsDeleting(true)
    try {
      await deleteProject(projectToDelete.id)
      closeDeleteDialog()
    } finally {
      setIsDeleting(false)
    }
  }

  const providerColors: Record<string, string> = {
    PASSWORD: 'bg-blue-50 text-blue-600 border-blue-100',
    GOOGLE: 'bg-red-50 text-red-600 border-red-100',
    GITHUB: 'bg-slate-50 text-slate-600 border-slate-200',
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projets</h1>
          <p className="mt-2 text-foreground/60">Gérez vos projets d'authentification</p>
        </div>
        <Button onClick={() => router.push('/first_app')}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Projet
        </Button>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <Input
          placeholder="Rechercher un projet..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ERREUR */}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* LOADING */}
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border border-border p-6 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-2/3 mb-3" />
              <div className="h-3 bg-slate-100 rounded w-1/2 mb-6" />
              <div className="h-3 bg-slate-100 rounded w-full mb-2" />
              <div className="h-3 bg-slate-100 rounded w-full" />
            </Card>
          ))}
        </div>
      )}

      {/* PROJETS */}
      {!isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="border border-border p-6 hover:shadow-md transition-shadow"
            >
              {/* HEADER CARD */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-xs text-foreground/40 mt-0.5">
                    Créé le {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="flex gap-2"
                      onClick={() => openSettingsDialog(project)}
                    >
                      <Settings className="h-4 w-4" />
                      Paramètres
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex gap-2 text-red-600 focus:text-red-600"
                      onClick={() => openDeleteDialog(project)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* PROVIDERS */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.authProviders.map((provider) => (
                  <span
                    key={provider}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${providerColors[provider] || 'bg-slate-50 text-slate-600'}`}
                  >
                    {provider}
                  </span>
                ))}
              </div>

              {/* CLÉS */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <Key className="h-3 w-3 text-blue-500 flex-shrink-0" />
                    <span className="text-[10px] font-mono text-slate-500 truncate">
                      {project.publicKey}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(project.publicKey, `pk-${project.id}`)}
                    className="ml-2 flex-shrink-0"
                  >
                    {copiedId === `pk-${project.id}`
                      ? <Check className="h-3 w-3 text-green-500" />
                      : <Copy className="h-3 w-3 text-slate-400 hover:text-slate-700" />
                    }
                  </button>
                </div>

                <div className="flex items-center justify-between bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <Key className="h-3 w-3 text-amber-500 flex-shrink-0" />
                    <span className="text-[10px] font-mono text-amber-600 truncate">
                      {project.secretKey.substring(0, 16)}••••••••
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(project.secretKey, `sk-${project.id}`)}
                    className="ml-2 flex-shrink-0"
                  >
                    {copiedId === `sk-${project.id}`
                      ? <Check className="h-3 w-3 text-green-500" />
                      : <Copy className="h-3 w-3 text-amber-400 hover:text-amber-700" />
                    }
                  </button>
                </div>
              </div>

              {/* THEME + STATUS */}
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="text-[10px]"
                  style={{ borderColor: project.primaryColor, color: project.primaryColor }}
                >
                  {project.theme}
                </Badge>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: project.primaryColor }}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* VIDE */}
      {!isLoading && filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-foreground/60 font-medium">
            {searchTerm ? 'Aucun projet trouvé' : 'Aucun projet pour le moment'}
          </p>
          {!searchTerm && (
            <Button
              className="mt-4"
              onClick={() => router.push('/first_app')}
            >
              Créer mon premier projet
            </Button>
          )}
        </div>
      )}

      <Dialog open={!!projectToView} onOpenChange={(open) => !open && closeSettingsDialog()}>
        <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Parametres du projet</DialogTitle>
            <DialogDescription>
              Apercu des caracteristiques du projet. La modification n&apos;est pas disponible pour le moment.
            </DialogDescription>
          </DialogHeader>

          {projectToView && (
            <div className="max-h-[68vh] overflow-y-auto pr-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-border p-4 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">Nom</span>
                  <span className="text-sm font-medium">{projectToView.name}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">ID</span>
                  <span className="text-sm font-mono">{projectToView.id}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">Date de creation</span>
                  <span className="text-sm">{new Date(projectToView.createdAt).toLocaleString('fr-FR')}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <span className="text-sm font-medium">{projectToView.theme}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-muted-foreground">Couleur primaire</span>
                  <span className="inline-flex items-center gap-2 text-sm font-mono">
                    <span className="h-3 w-3 rounded-full border" style={{ backgroundColor: projectToView.primaryColor }} />
                    {projectToView.primaryColor}
                  </span>
                </div>
              </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-border p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">Methodes d&apos;authentification</p>
                    <div className="flex flex-wrap gap-2">
                      {projectToView.authProviders.map((provider) => (
                        <Badge key={provider} variant="outline">
                          {provider}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-border p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">Cles du projet</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 rounded-md bg-muted/50 px-3 py-2">
                        <span className="text-xs font-mono truncate">{projectToView.publicKey}</span>
                        <button
                          onClick={() => copyToClipboard(projectToView.publicKey, `settings-pk-${projectToView.id}`)}
                          className="ml-2 flex-shrink-0"
                        >
                          {copiedId === `settings-pk-${projectToView.id}`
                            ? <Check className="h-3 w-3 text-green-500" />
                            : <Copy className="h-3 w-3 text-slate-500 hover:text-slate-700" />
                          }
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2 rounded-md bg-muted/50 px-3 py-2">
                        <span className="text-xs font-mono truncate">{projectToView.secretKey}</span>
                        <button
                          onClick={() => copyToClipboard(projectToView.secretKey, `settings-sk-${projectToView.id}`)}
                          className="ml-2 flex-shrink-0"
                        >
                          {copiedId === `settings-sk-${projectToView.id}`
                            ? <Check className="h-3 w-3 text-green-500" />
                            : <Copy className="h-3 w-3 text-slate-500 hover:text-slate-700" />
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeSettingsDialog}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!projectToDelete} onOpenChange={(open) => !open && closeDeleteDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer le projet</DialogTitle>
            <DialogDescription>
              Cette action est irreversible. Pour confirmer, saisissez le nom exact du projet:
              <span className="mt-1 block font-semibold text-foreground">
                {projectToDelete?.name}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Input
              value={deleteConfirmName}
              onChange={(e) => setDeleteConfirmName(e.target.value)}
              placeholder="Nom du projet"
              autoFocus
            />
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog} disabled={isDeleting}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => void handleDelete()}
              disabled={
                isDeleting ||
                !projectToDelete ||
                deleteConfirmName.trim() !== projectToDelete.name
              }
            >
              {isDeleting ? 'Suppression...' : 'Supprimer definitivement'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
