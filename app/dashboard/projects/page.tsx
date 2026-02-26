'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Search, Plus, Settings, MoreHorizontal, Trash2, 
  Calendar, LayoutGrid, ShieldCheck 
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProjectStore } from '@/store/projectStore'
import type { Project } from '@/app/services/projectService'
import EditProjectModal from '@/components/Projets/EditProjectModal'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
  const [projectToView, setProjectToView] = useState<Project | null>(null)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const [deleteConfirmName, setDeleteConfirmName] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])

  const filteredProjects = useMemo(() => {
    return projects.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [projects, searchTerm])

  const handleDelete = async () => {
    if (!projectToDelete || deleteConfirmName.trim() !== projectToDelete.name) return
    setIsDeleting(true)
    try {
      await deleteProject(projectToDelete.id)
      setProjectToDelete(null)
      setDeleteConfirmName('')
    } finally {
      setIsDeleting(false)
    }
  }

  const providerColors: Record<string, string> = {
    PASSWORD: 'bg-blue-50 text-blue-700 border-blue-100',
    GOOGLE: 'bg-red-50 text-red-700 border-red-100',
    GITHUB: 'bg-slate-100 text-slate-700 border-slate-200',
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mes Projets</h1>
          <p className="text-sm text-muted-foreground italic">
            {filteredProjects.length} application(s) répertoriée(s)
          </p>
        </div>
        <Button 
          onClick={() => router.push('/first_app')} 
          className="shadow-sm font-semibold"
        >
          <Plus className="mr-2 h-4 w-4" /> Nouveau Projet
        </Button>
      </div>

      {/* SEARCH */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Rechercher par nom..."
          className="pl-9 bg-card border-border/60 focus:border-primary/50 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-xs font-medium">
          {error}
        </div>
      )}

      {/* GRID */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-muted/40 animate-pulse border border-border/50" />
          ))
        ) : (
          filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group relative flex flex-col border-border/60 transition-all duration-200 overflow-hidden shadow-sm"
            >
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div 
                      className="h-2.5 w-2.5 rounded-full shrink-0" 
                      style={{ 
                        backgroundColor: project.primaryColor,
                        boxShadow: `0 0 0 4px ${project.primaryColor}15` 
                      }} 
                    />
                    <h3 className="font-bold text-sm truncate uppercase tracking-wide text-foreground/80">
                      {project.name}
                    </h3>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-muted transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem onClick={() => setProjectToView(project)}>
                        <Settings className="mr-2 h-4 w-4" /> Configurer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => setProjectToDelete(project)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.authProviders.map((p) => (
                    <Badge key={p} variant="outline" className={`text-[9px] px-1.5 py-0 border-transparent font-bold ${providerColors[p]}`}>
                      {p}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-tighter font-medium">
                   <ShieldCheck className="h-3 w-3 text-green-500" />
                   Configuration active
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-auto px-4 py-2 bg-muted/10 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1 opacity-60" />
                  {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                </span>
                <span className="font-mono opacity-40">
                  REF: {String(project.id).slice(0, 6)}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* EMPTY STATE */}
      {!isLoading && filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-12 w-12 bg-muted rounded-2xl flex items-center justify-center mb-4 text-muted-foreground/30 font-bold">
            <LayoutGrid className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium">Aucun projet</h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm ? "Aucun résultat trouvé pour votre recherche." : "Ajoutez votre premier projet pour commencer."}
          </p>
        </div>
      )}

      {/* MODAL DE CONFIGURATION */}
      {projectToView && (
        <EditProjectModal project={projectToView} onClose={() => setProjectToView(null)} />
      )}

      {/* DIALOGUE DE SUPPRESSION */}
      <Dialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Supprimer le projet ?</DialogTitle>
            <DialogDescription className="text-xs">
              Pour confirmer la suppression de <strong>{projectToDelete?.name}</strong>, veuillez saisir son nom ci-dessous.
            </DialogDescription>
          </DialogHeader>
          <Input 
            value={deleteConfirmName} 
            onChange={(e) => setDeleteConfirmName(e.target.value)}
            placeholder="Nom du projet"
            className="mt-2"
          />
          <DialogFooter className="mt-4 gap-2">
            <Button variant="outline" onClick={() => setProjectToDelete(null)} disabled={isDeleting} className="w-full text-xs">Annuler</Button>
            <Button 
              variant="destructive" 
              disabled={isDeleting || deleteConfirmName !== projectToDelete?.name}
              onClick={() => void handleDelete()}
              className="w-full text-xs"
            >
              {isDeleting ? "Suppression..." : "Supprimer définitivement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}