'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, MoreVertical, Copy } from 'lucide-react'
import { mockWebhooks } from '@/lib/mock-data'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function WebhooksPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Webhooks</h1>
          <p className="mt-2 text-foreground/60">
            Set up webhooks to get real-time notifications about events
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Webhook
        </Button>
      </div>

      {/* Webhooks Table */}
      <Card className="border border-border p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold">Endpoint</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Events</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Status</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Last Triggered</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWebhooks.map((webhook) => (
                <TableRow
                  key={webhook.id}
                  className="border-b border-border hover:bg-background/50"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-background/50 px-2 py-1 rounded flex-1 font-mono break-all">
                        {webhook.endpoint}
                      </code>
                      <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.slice(0, 2).map((event) => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
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
                    <Badge
                      variant={webhook.status === 'active' ? 'default' : 'secondary'}
                    >
                      {webhook.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-foreground/60">
                    {webhook.lastTriggered.toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Deliveries</DropdownMenuItem>
                        <DropdownMenuItem>Test Webhook</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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

      {/* Events Info */}
      <Card className="border border-border p-6">
        <h2 className="mb-4 font-semibold">Available Events</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {['user.signup', 'user.login', 'user.logout', 'user.email.verified', 'session.created', 'session.ended'].map((event) => (
            <div key={event} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <code className="text-sm font-mono">{event}</code>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
