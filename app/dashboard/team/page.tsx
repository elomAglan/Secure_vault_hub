'use client'

import { useEffect, useMemo, useState } from 'react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, MoreVertical, Mail } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { useProjectStore } from '@/store/projectStore'
import { appToast } from '@/lib/toast'
import { teamService, TeamInvitation, TeamMember } from '@/app/services/teamService'

export default function TeamPage() {
  const { projects, fetchProjects } = useProjectStore()

  const [mounted, setMounted] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [members, setMembers] = useState<TeamMember[]>([])
  const [invitations, setInvitations] = useState<TeamInvitation[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [isInviting, setIsInviting] = useState(false)
  const [roleActionLoadingId, setRoleActionLoadingId] = useState<number | null>(null)
  const [memberActionLoadingId, setMemberActionLoadingId] = useState<number | null>(null)
  const [invitationActionLoadingId, setInvitationActionLoadingId] = useState<number | null>(null)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const selectedProject = useMemo(
    () => projects.find((project) => String(project.id) === selectedProjectId),
    [projects, selectedProjectId]
  )
  const isOwner = selectedProject?.owner ?? false
  const isAdminOrOwner = isOwner

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])

  useEffect(() => {
    if (!projects.length) return
    if (!selectedProjectId) setSelectedProjectId(String(projects[0].id))
  }, [projects, selectedProjectId])

  useEffect(() => {
    if (!selectedProjectId) return
    void loadTeamData(Number(selectedProjectId))
  }, [selectedProjectId])

  const loadTeamData = async (projectId: number) => {
    setIsLoading(true)
    try {
      const [membersData, invitationsData] = await Promise.all([
        teamService.getMembers(projectId),
        teamService.getPendingInvitations(projectId),
      ])

      setMembers(membersData)
      setInvitations(invitationsData)
    } catch {
      appToast.error("Erreur lors du chargement de l'équipe")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInvite = async () => {
    const projectId = Number(selectedProjectId)
    const email = inviteEmail.trim()

    if (!projectId) return
    if (!email) {
      appToast.error('Email requis')
      return
    }

    setIsInviting(true)
    try {
      await teamService.invite(projectId, { email })
      appToast.success('Invitation envoyée')
      setInviteEmail('')
      setIsInviteDialogOpen(false)
      await loadTeamData(projectId)
    } catch {
      appToast.error("Erreur lors de l'invitation")
    } finally {
      setIsInviting(false)
    }
  }

  const handleCancelInvitation = async (invitationId: number) => {
    const projectId = Number(selectedProjectId)
    if (!projectId) return

    setInvitationActionLoadingId(invitationId)
    try {
      await teamService.cancelInvitation(projectId, invitationId)
      appToast.success('Invitation annulée')
      await loadTeamData(projectId)
    } catch {
      appToast.error("Erreur lors de l'annulation")
    } finally {
      setInvitationActionLoadingId(null)
    }
  }

  const handleChangeRole = async (memberId: number, role: 'admin' | 'member') => {
    const projectId = Number(selectedProjectId)
    if (!projectId) return

    setRoleActionLoadingId(memberId)
    try {
      await teamService.changeMemberRole(projectId, memberId, role)
      appToast.success('Rôle mis à jour')
      await loadTeamData(projectId)
    } catch {
      appToast.error('Erreur lors de la mise à jour du rôle')
    } finally {
      setRoleActionLoadingId(null)
    }
  }

  const handleRemoveMember = async (member: TeamMember) => {
    const projectId = Number(selectedProjectId)
    if (!projectId) return
    if (!confirm(`Retirer ${member.firstName} ${member.lastName} de l'équipe ?`)) return

    setMemberActionLoadingId(member.id)
    try {
      await teamService.removeMember(projectId, member.id)
      appToast.success('Membre retiré')
      await loadTeamData(projectId)
    } catch {
      appToast.error('Erreur lors du retrait du membre')
    } finally {
      setMemberActionLoadingId(null)
    }
  }

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()

  const formatRole = (role: string) => {
    const roles: Record<string, string> = {
      admin: 'Administrateur',
      owner: 'Propriétaire',
      member: 'Membre',
    }
    return roles[role.toLowerCase()] || role
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Équipe</h1>
          <p className="mt-2 text-foreground/60">Gérez les membres de l'équipe et leurs permissions</p>
        </div>
        {mounted ? (
          <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!selectedProjectId || !isAdminOrOwner}>
                <Plus className="mr-2 h-4 w-4" />
                Inviter un membre
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Inviter un membre dans l'équipe</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Adresse Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="membre@exemple.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    disabled={isInviting}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)} disabled={isInviting}>
                    Annuler
                  </Button>
                  <Button onClick={() => void handleInvite()} disabled={isInviting}>
                    {isInviting ? 'Envoi...' : "Envoyer l'invitation"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Inviter un membre
          </Button>
        )}
      </div>

      <Card className="border border-border p-6">
        <Label className="mb-2 block">Projet</Label>
        {mounted ? (
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
        ) : (
          <div className="h-10 max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
            Sélectionnez un projet
          </div>
        )}
      </Card>

      <Card className="border border-border p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold">Membre</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Email</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Rôle</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Rejoint le</TableHead>
                <TableHead className="px-6 py-4 text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!selectedProjectId && (
                <TableRow>
                  <TableCell colSpan={5} className="px-6 py-8 text-center text-foreground/60">
                    Sélectionnez un projet pour voir les membres de l'équipe.
                  </TableCell>
                </TableRow>
              )}

              {isLoading && selectedProjectId && (
                <TableRow>
                  <TableCell colSpan={5} className="px-6 py-8 text-center text-foreground/60">
                    Chargement des membres...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && selectedProjectId && members.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="px-6 py-8 text-center text-foreground/60">
                    Aucun membre dans l'équipe pour le moment.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                members.map((member) => {
                  const role = member.role.toLowerCase()
                  const isMemberOwner = role === 'owner'
                  const isMemberBusy = roleActionLoadingId === member.id || memberActionLoadingId === member.id

                  return (
                    <TableRow key={member.id} className="border-b border-border hover:bg-background/50">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{getInitials(member.firstName, member.lastName)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {member.firstName} {member.lastName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-foreground/60">{member.email}</TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge variant="outline" className="capitalize">
                          {formatRole(member.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-foreground/60">
                        {new Date(member.joinedAt).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              disabled={isMemberBusy || !isAdminOrOwner}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {isMemberOwner && (
                              <DropdownMenuItem disabled>Propriétaire (actions bloquées)</DropdownMenuItem>
                            )}
                            {isOwner && !isMemberOwner && role !== 'admin' && (
                              <DropdownMenuItem
                                disabled={isMemberBusy}
                                onClick={() => void handleChangeRole(member.id, 'admin')}
                              >
                                Passer administrateur
                              </DropdownMenuItem>
                            )}
                            {isOwner && !isMemberOwner && role !== 'member' && (
                              <DropdownMenuItem
                                disabled={isMemberBusy}
                                onClick={() => void handleChangeRole(member.id, 'member')}
                              >
                                Passer membre
                              </DropdownMenuItem>
                            )}
                            {isAdminOrOwner && !isMemberOwner && (
                              <DropdownMenuItem
                                className="text-destructive"
                                disabled={isMemberBusy}
                                onClick={() => void handleRemoveMember(member)}
                              >
                                Retirer le membre
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="border border-border p-6">
        <h2 className="mb-4 font-semibold">Invitations en attente</h2>

        {isLoading && <p className="text-sm text-foreground/60">Chargement des invitations...</p>}

        {!isLoading && invitations.length === 0 && (
          <p className="text-sm text-foreground/60">Aucune invitation en attente.</p>
        )}

        <div className="space-y-3">
          {invitations.map((invitation) => (
            <div key={invitation.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-foreground/40" />
                <div>
                  <p className="text-sm font-medium">{invitation.email}</p>
                  <p className="text-xs text-foreground/60">
                    Invité le {new Date(invitation.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              {isAdminOrOwner && (
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={invitationActionLoadingId === invitation.id}
                  onClick={() => void handleCancelInvitation(invitation.id)}
                >
                  {invitationActionLoadingId === invitation.id ? 'Annulation...' : 'Annuler'}
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
