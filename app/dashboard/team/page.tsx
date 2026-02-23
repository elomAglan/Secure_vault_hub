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
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')

  const selectedProject = useMemo(
    () => projects.find((p) => String(p.id) === selectedProjectId),
    [projects, selectedProjectId]
  )

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
      appToast.error('Erreur lors du chargement de l equipe')
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
      appToast.success('Invitation envoyee')
      setInviteEmail('')
      setIsInviteDialogOpen(false)
      await loadTeamData(projectId)
    } catch {
      appToast.error('Erreur lors de l invitation')
    } finally {
      setIsInviting(false)
    }
  }

  const handleCancelInvitation = async (invitationId: number) => {
    const projectId = Number(selectedProjectId)
    if (!projectId) return

    try {
      await teamService.cancelInvitation(projectId, invitationId)
      appToast.success('Invitation annulee')
      await loadTeamData(projectId)
    } catch {
      appToast.error('Erreur lors de l annulation')
    }
  }

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()

  const formatRole = (role: string) => role.toLowerCase()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="mt-2 text-foreground/60">Manage team members and permissions</p>
        </div>
        {mounted ? (
          <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!selectedProjectId}>
                <Plus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="member@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    disabled={isInviting}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)} disabled={isInviting}>
                    Cancel
                  </Button>
                  <Button onClick={() => void handleInvite()} disabled={isInviting}>
                    {isInviting ? 'Sending...' : 'Send Invite'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        )}
      </div>

      <Card className="border border-border p-6">
        <Label className="mb-2 block">Project</Label>
        {mounted ? (
          <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="Select a project" />
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
            Select a project
          </div>
        )}
      </Card>

      <Card className="border border-border p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold">Member</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Email</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Role</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Joined</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!selectedProjectId && (
                <TableRow>
                  <TableCell colSpan={5} className="px-6 py-8 text-center text-foreground/60">
                    Select a project to view team members.
                  </TableCell>
                </TableRow>
              )}

              {isLoading && selectedProjectId && (
                <TableRow>
                  <TableCell colSpan={5} className="px-6 py-8 text-center text-foreground/60">
                    Loading members...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && selectedProjectId && members.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="px-6 py-8 text-center text-foreground/60">
                    No team members yet.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && members.map((member) => (
                <TableRow
                  key={member.id}
                  className="border-b border-border hover:bg-background/50"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{getInitials(member.firstName, member.lastName)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{member.firstName} {member.lastName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-foreground/60">
                    {member.email}
                  </TableCell>
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
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem disabled>Change Role (not available)</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" disabled>
                          Remove Member (not available)
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

      <Card className="border border-border p-6">
        <h2 className="mb-4 font-semibold">Pending Invitations</h2>

        {isLoading && (
          <p className="text-sm text-foreground/60">Loading invitations...</p>
        )}

        {!isLoading && invitations.length === 0 && (
          <p className="text-sm text-foreground/60">No pending invitations.</p>
        )}

        <div className="space-y-3">
          {invitations.map((invitation) => (
            <div key={invitation.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-foreground/40" />
                <div>
                  <p className="text-sm font-medium">{invitation.email}</p>
                  <p className="text-xs text-foreground/60">
                    Invited {new Date(invitation.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => void handleCancelInvitation(invitation.id)}
              >
                Cancel
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
