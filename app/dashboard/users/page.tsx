'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, MoreVertical, Users, RefreshCw } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'
import { sdkUsersService, ProjectUserItem } from '@/app/services/sdkUsersService'
import { appToast } from '@/lib/toast'

export default function UsersPage() {
  const { projects, fetchProjects } = useProjectStore()

  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [users, setUsers] = useState<ProjectUserItem[]>([])
  const [totalElements, setTotalElements] = useState(0) 
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Récupère la secretKey du projet sélectionné
  const selectedProject = useMemo(
    () => projects.find((p) => String(p.id) === selectedProjectId),
    [projects, selectedProjectId]
  )

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (!projects.length) return
    if (!selectedProjectId) setSelectedProjectId(String(projects[0].id))
  }, [projects])

  useEffect(() => {
    if (!selectedProject) return
    loadUsers(0, searchTerm)
  }, [selectedProjectId])

  const loadUsers = async (page: number, query: string) => {
    if (!selectedProject) return
    setIsLoading(true)
    try {
      const result = await sdkUsersService.getUsers(
        selectedProject.secretKey, query, page, 10
      )
      setUsers(result.users)
      setTotalElements(result.totalElements)
      setTotalPages(result.totalPages)
      setCurrentPage(result.currentPage)
    } catch {
      appToast.error('Erreur lors du chargement des utilisateurs')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    loadUsers(0, value)
  }

  const handleDisable = async (email: string) => {
    if (!selectedProject) return
    try {
      await sdkUsersService.disableUser(selectedProject.secretKey, email)
      appToast.success('Utilisateur désactivé')
      loadUsers(currentPage, searchTerm)
    } catch {
      appToast.error('Erreur lors de la désactivation')
    }
  }

  const handleEnable = async (email: string) => {
    if (!selectedProject) return
    try {
      await sdkUsersService.enableUser(selectedProject.secretKey, email)
      appToast.success('Utilisateur réactivé')
      loadUsers(currentPage, searchTerm)
    } catch {
      appToast.error('Erreur lors de la réactivation')
    }
  }

  const handleDelete = async (email: string) => {
    if (!selectedProject) return
    if (!confirm('Supprimer cet utilisateur ?')) return
    try {
      await sdkUsersService.deleteUser(selectedProject.secretKey, email)
      appToast.success('Utilisateur supprimé')
      loadUsers(currentPage, searchTerm)
    } catch {
      appToast.error('Erreur lors de la suppression')
    }
  }

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName[0]}${lastName[0]}`.toUpperCase()

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Utilisateurs
          </h1>
          <p className="mt-2 text-foreground/60">
            Gérez les utilisateurs de vos projets SDK
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => loadUsers(currentPage, searchTerm)}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {/* PROJET SELECTOR */}
      <Card className="border border-border p-6">
        <Label className="mb-2 block">Projet</Label>
        <Select
          value={selectedProjectId}
          onValueChange={(val) => {
            setSelectedProjectId(val)
            setSearchTerm('')
            setCurrentPage(0)
          }}
        >
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

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <Input
          placeholder="Rechercher par nom ou email..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <Card className="border border-border p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold">Utilisateur</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Statut</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Inscrit le</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!selectedProjectId && (
                <TableRow>
                  <TableCell colSpan={4} className="px-6 py-8 text-center text-foreground/60">
                    Sélectionnez un projet pour voir ses utilisateurs.
                  </TableCell>
                </TableRow>
              )}

              {isLoading && selectedProjectId && (
                <TableRow>
                  <TableCell colSpan={4} className="px-6 py-8 text-center text-foreground/60">
                    Chargement...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && selectedProjectId && users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="px-6 py-8 text-center text-foreground/60">
                    Aucun utilisateur trouvé.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-b border-border hover:bg-background/50"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>
                          {getInitials(user.firstName, user.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-foreground/60">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <Badge variant={user.enabled ? 'default' : 'secondary'}>
                      {user.enabled ? 'Actif' : 'Désactivé'}
                    </Badge>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-sm text-foreground/60">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </TableCell>

                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {user.enabled ? (
                          <DropdownMenuItem
                            onClick={() => handleDisable(user.email)}
                          >
                            Désactiver
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleEnable(user.email)}
                          >
                            Réactiver
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(user.email)}
                        >
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* PAGINATION */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/60">
          {totalElements} utilisateur{totalElements > 1 ? 's' : ''} au total
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 0 || isLoading}
            onClick={() => loadUsers(currentPage - 1, searchTerm)}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            disabled={currentPage >= totalPages - 1 || isLoading}
            onClick={() => loadUsers(currentPage + 1, searchTerm)}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}