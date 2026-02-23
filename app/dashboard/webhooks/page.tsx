'use client'

import { useEffect, useMemo, useState } from 'react'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, MoreVertical, Copy, Check } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useProjectStore } from '@/store/projectStore'
import { useWebhookStore } from '@/store/webhookStore'
import type { CreateWebhookPayload, Webhook } from '@/app/services/webhookService'
import type { WebhookEvent } from '@/types/webhook'
import { appToast } from '@/lib/toast'

const WEBHOOK_EVENTS: WebhookEvent[] = [
  'USER_CREATED',
  'USER_LOGIN',
  'USER_DISABLED',
  'USER_ENABLED',
  'USER_DELETED',
]

const eventLabel = (event: WebhookEvent) => event.toLowerCase().replace('_', '.')

export default function WebhooksPage() {
  const {
    projects,
    fetchProjects,
    isLoading: isProjectsLoading,
    error: projectsError,
  } = useProjectStore()

  const {
    webhooks,
    fetchWebhooks,
    createWebhook,
    updateWebhook,
    deleteWebhook,
    isLoading: isWebhooksLoading,
    error: webhooksError,
    clearError,
  } = useWebhookStore()

  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingWebhook, setEditingWebhook] = useState<Webhook | null>(null)
  const [url, setUrl] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [events, setEvents] = useState<WebhookEvent[]>(['USER_CREATED'])
  const [copiedId, setCopiedId] = useState<number | null>(null)

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])

  useEffect(() => {
    if (!projects.length) return
    if (selectedProjectId) return
    setSelectedProjectId(String(projects[0].id))
  }, [projects, selectedProjectId])

  useEffect(() => {
    if (!selectedProjectId) return
    void fetchWebhooks(Number(selectedProjectId))
  }, [selectedProjectId, fetchWebhooks])

  const currentProject = useMemo(
    () => projects.find((p) => String(p.id) === selectedProjectId),
    [projects, selectedProjectId]
  )

  const resetForm = () => {
    setUrl('')
    setEnabled(true)
    setEvents(['USER_CREATED'])
    setEditingWebhook(null)
    clearError()
  }

  const openCreateModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const openEditModal = (webhook: Webhook) => {
    setEditingWebhook(webhook)
    setUrl(webhook.url)
    setEnabled(webhook.enabled)
    setEvents(webhook.events)
    clearError()
    setIsModalOpen(true)
  }

  const closeModal = () => {
    if (isWebhooksLoading) return
    setIsModalOpen(false)
    resetForm()
  }

  const toggleEvent = (event: WebhookEvent) => {
    setEvents((prev) => {
      if (prev.includes(event)) {
        return prev.filter((e) => e !== event)
      }
      return [...prev, event]
    })
  }

  const copyToClipboard = async (id: number, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 1500)
    } catch {
      appToast.error('Copie impossible')
    }
  }

  const handleSubmit = async () => {
    const projectId = Number(selectedProjectId)
    if (!projectId) return

    const normalizedUrl = url.trim()
    if (!normalizedUrl) {
      appToast.error('URL requise')
      return
    }

    if (!events.length) {
      appToast.error('Selectionnez au moins un event')
      return
    }

    const payload: CreateWebhookPayload = {
      url: normalizedUrl,
      enabled,
      events,
    }

    try {
      if (editingWebhook) {
        await updateWebhook(projectId, editingWebhook.id, payload)
        appToast.success('Webhook modifie')
      } else {
        await createWebhook(projectId, payload)
        appToast.success('Webhook cree')
      }

      closeModal()
    } catch {
      // handled in store
    }
  }

  const handleDelete = async (webhookId: number) => {
    const projectId = Number(selectedProjectId)
    if (!projectId) return

    if (!window.confirm('Supprimer ce webhook ?')) return

    try {
      await deleteWebhook(projectId, webhookId)
      appToast.success('Webhook supprime')
    } catch {
      // handled in store
    }
  }

  const pageError = projectsError || webhooksError

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Webhooks</h1>
          <p className="mt-2 text-foreground/60">
            Configurez vos webhooks pour recevoir des notifications en temps reel.
          </p>
        </div>
        <Button onClick={openCreateModal} disabled={!selectedProjectId || isProjectsLoading}>
          <Plus className="mr-2 h-4 w-4" />
          Add Webhook
        </Button>
      </div>

      <Card className="border border-border p-6">
        <Label className="mb-2 block">Projet</Label>
        <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
          <SelectTrigger className="max-w-md">
            <SelectValue placeholder="Selectionnez un projet" />
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

      {pageError && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl">
          {pageError}
        </div>
      )}

      <Card className="border border-border p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold">Endpoint</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Events</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Status</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Cree le</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Secret</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isProjectsLoading && !selectedProjectId && (
                <TableRow>
                  <TableCell colSpan={6} className="px-6 py-8 text-center text-foreground/60">
                    Creez un projet pour configurer des webhooks.
                  </TableCell>
                </TableRow>
              )}

              {isWebhooksLoading && selectedProjectId && (
                <TableRow>
                  <TableCell colSpan={6} className="px-6 py-8 text-center text-foreground/60">
                    Chargement des webhooks...
                  </TableCell>
                </TableRow>
              )}

              {!isWebhooksLoading && selectedProjectId && webhooks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="px-6 py-8 text-center text-foreground/60">
                    Aucun webhook pour ce projet.
                  </TableCell>
                </TableRow>
              )}

              {!isWebhooksLoading &&
                webhooks.map((webhook) => (
                  <TableRow
                    key={webhook.id}
                    className="border-b border-border hover:bg-background/50"
                  >
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-background/50 px-2 py-1 rounded flex-1 font-mono break-all">
                          {webhook.url}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0"
                          onClick={() => void copyToClipboard(webhook.id, webhook.url)}
                        >
                          {copiedId === webhook.id ? (
                            <Check className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {webhook.events.slice(0, 2).map((event) => (
                          <Badge key={`${webhook.id}-${event}`} variant="outline" className="text-xs">
                            {eventLabel(event)}
                          </Badge>
                        ))}
                        {webhook.events.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{webhook.events.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <Badge variant={webhook.enabled ? 'default' : 'secondary'}>
                        {webhook.enabled ? 'active' : 'disabled'}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-6 py-4 text-sm text-foreground/60">
                      {new Date(webhook.createdAt).toLocaleString('fr-FR')}
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded font-mono">
                          {webhook.secret.substring(0, 12)}••••
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => void copyToClipboard(webhook.id, webhook.secret)}
                        >
                          {copiedId === webhook.id ? (
                            <Check className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(webhook)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => void handleDelete(webhook.id)}
                          >
                            Delete
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
        <h2 className="mb-4 font-semibold">Available Events</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {WEBHOOK_EVENTS.map((event) => (
            <div key={event} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <code className="text-sm font-mono">{eventLabel(event)}</code>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingWebhook ? 'Edit Webhook' : 'Add Webhook'}</DialogTitle>
            <DialogDescription>
              {currentProject
                ? `Projet: ${currentProject.name}`
                : 'Selectionnez un projet avant de continuer.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Endpoint URL</Label>
              <Input
                id="webhook-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/webhooks"
              />
            </div>

            <div className="space-y-2">
              <Label>Events</Label>
              <div className="space-y-2 rounded-md border border-border p-3">
                {WEBHOOK_EVENTS.map((event) => (
                  <div key={event} className="flex items-center gap-2">
                    <Checkbox
                      id={`event-${event}`}
                      checked={events.includes(event)}
                      onCheckedChange={() => toggleEvent(event)}
                    />
                    <Label htmlFor={`event-${event}`} className="font-normal">
                      {eventLabel(event)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="webhook-enabled"
                checked={enabled}
                onCheckedChange={(value) => setEnabled(value === true)}
              />
              <Label htmlFor="webhook-enabled" className="font-normal">
                Webhook active
              </Label>
            </div>

            {webhooksError && (
              <p className="text-sm text-red-600">{webhooksError}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeModal} disabled={isWebhooksLoading}>
              Cancel
            </Button>
            <Button
              onClick={() => void handleSubmit()}
              disabled={!selectedProjectId || isWebhooksLoading}
            >
              {isWebhooksLoading ? 'Saving...' : editingWebhook ? 'Save' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
