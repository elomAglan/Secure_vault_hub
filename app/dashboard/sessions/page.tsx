'use client'

import { useEffect, useMemo, useState } from 'react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { MoreVertical, Smartphone, Monitor, Tablet, RefreshCw } from 'lucide-react'

import { useProjectStore } from '@/store/projectStore'
import { appToast } from '@/lib/toast'
import { sessionService, SdkSession } from '@/app/services/sessionService'

export default function SessionsPage() {
  const { projects, fetchProjects } = useProjectStore()

  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [sessions, setSessions] = useState<SdkSession[]>([])
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const selectedProject = useMemo(
    () => projects.find((p) => String(p.id) === selectedProjectId),
    [projects, selectedProjectId]
  )

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])

  useEffect(() => {
    if (!projects.length) return
    if (!selectedProjectId) setSelectedProjectId(String(projects[0].id))
  }, [projects, selectedProjectId])

  useEffect(() => {
    if (!selectedProject) return
    void loadSessions(0)
  }, [selectedProject])

  const loadSessions = async (page: number) => {
    if (!selectedProject) return

    setIsLoading(true)
    try {
      const result = await sessionService.getSessions(selectedProject.secretKey, page, 10)
      setSessions(result.sessions)
      setTotalElements(result.totalElements)
      setTotalPages(result.totalPages)
      setCurrentPage(result.currentPage)
    } catch {
      appToast.error('Erreur lors du chargement des sessions')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevoke = async (sessionId: number) => {
    if (!selectedProject) return

    if (!window.confirm('Revoquer cette session ?')) return

    try {
      await sessionService.revokeSession(selectedProject.secretKey, sessionId)
      appToast.success('Session revoquee')
      await loadSessions(currentPage)
    } catch {
      appToast.error('Erreur lors de la revocation de la session')
    }
  }

  const getDeviceIcon = (userAgent: string) => {
    const ua = userAgent.toLowerCase()
    if (ua.includes('iphone') || ua.includes('android') || ua.includes('mobile')) {
      return <Smartphone className="h-4 w-4" />
    }
    if (ua.includes('ipad') || ua.includes('tablet')) {
      return <Tablet className="h-4 w-4" />
    }
    return <Monitor className="h-4 w-4" />
  }

  const getBrowser = (userAgent: string) => {
    const ua = userAgent.toLowerCase()
    if (ua.includes('edg/')) return 'Edge'
    if (ua.includes('chrome/')) return 'Chrome'
    if (ua.includes('firefox/')) return 'Firefox'
    if (ua.includes('safari/') && !ua.includes('chrome/')) return 'Safari'
    return 'Unknown'
  }

  const getDeviceLabel = (userAgent: string) => {
    const ua = userAgent.toLowerCase()
    if (ua.includes('iphone')) return 'iPhone'
    if (ua.includes('ipad')) return 'iPad'
    if (ua.includes('android')) return 'Android'
    if (ua.includes('windows')) return 'Windows'
    if (ua.includes('mac os')) return 'macOS'
    if (ua.includes('linux')) return 'Linux'
    return 'Unknown Device'
  }

  const formatLastActivity = (iso: string) => {
    const date = new Date(iso)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sessions</h1>
          <p className="mt-2 text-foreground/60">
            Monitor active user sessions and devices
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => void loadSessions(currentPage)}
          disabled={isLoading || !selectedProject}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Card className="border border-border p-6">
        <Label className="mb-2 block">Project</Label>
        <Select
          value={selectedProjectId}
          onValueChange={(value) => {
            setSelectedProjectId(value)
            setCurrentPage(0)
          }}
        >
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
      </Card>

      <Card className="border border-border p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold">Device</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Browser</TableHead>
                <TableHead className="px-6 py-4 font-semibold">User</TableHead>
                <TableHead className="px-6 py-4 font-semibold">IP Address</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Last Activity</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Status</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!selectedProjectId && (
                <TableRow>
                  <TableCell colSpan={7} className="px-6 py-8 text-center text-foreground/60">
                    Select a project to view sessions.
                  </TableCell>
                </TableRow>
              )}

              {isLoading && selectedProjectId && (
                <TableRow>
                  <TableCell colSpan={7} className="px-6 py-8 text-center text-foreground/60">
                    Loading sessions...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && selectedProjectId && sessions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="px-6 py-8 text-center text-foreground/60">
                    No active sessions
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && sessions.map((session) => (
                <TableRow
                  key={session.id}
                  className="border-b border-border hover:bg-background/50"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(session.userAgent)}
                      <span className="text-sm">{getDeviceLabel(session.userAgent)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">{getBrowser(session.userAgent)}</TableCell>
                  <TableCell className="px-6 py-4 text-sm">{session.email}</TableCell>
                  <TableCell className="px-6 py-4 text-sm font-mono text-xs">
                    {session.ipAddress}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">
                    <Badge variant="outline">
                      {formatLastActivity(session.createdAt)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">
                    <Badge variant={session.active ? 'default' : 'secondary'}>
                      {session.active ? 'Active' : 'Revoked'}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => void handleRevoke(session.id)}
                          disabled={!session.active}
                        >
                          Revoke Session
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

      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/60">
          {totalElements} session{totalElements > 1 ? 's' : ''} total
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 0 || isLoading || !selectedProject}
            onClick={() => void loadSessions(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={currentPage >= totalPages - 1 || isLoading || !selectedProject}
            onClick={() => void loadSessions(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-background/50 p-4">
        <p className="text-sm text-foreground/60">
          Active sessions are shown here. You can revoke any session to force the user to
          re-authenticate.
        </p>
      </div>
    </div>
  )
}
