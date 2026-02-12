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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Smartphone, Monitor, Tablet } from 'lucide-react'
import { mockSessions } from '@/lib/mock-data'

export default function SessionsPage() {
  const getDeviceIcon = (device: string) => {
    if (device.includes('iPhone')) return <Smartphone className="h-4 w-4" />
    if (device.includes('iPad')) return <Tablet className="h-4 w-4" />
    return <Monitor className="h-4 w-4" />
  }

  const formatLastActivity = (date: Date) => {
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
      <div>
        <h1 className="text-3xl font-bold">Sessions</h1>
        <p className="mt-2 text-foreground/60">
          Monitor active user sessions and devices
        </p>
      </div>

      {/* Table */}
      <Card className="border border-border p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold">Device</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Browser</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Location</TableHead>
                <TableHead className="px-6 py-4 font-semibold">IP Address</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Last Activity</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSessions.map((session) => (
                <TableRow
                  key={session.id}
                  className="border-b border-border hover:bg-background/50"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(session.device)}
                      <span className="text-sm">{session.device}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">{session.browser}</TableCell>
                  <TableCell className="px-6 py-4 text-sm">{session.location}</TableCell>
                  <TableCell className="px-6 py-4 text-sm font-mono text-xs">
                    {session.ip}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">
                    <Badge variant="outline">
                      {formatLastActivity(session.lastActivity)}
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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

        {mockSessions.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-foreground/60">No active sessions</p>
          </div>
        )}
      </Card>

      {/* Info */}
      <div className="rounded-lg border border-border bg-background/50 p-4">
        <p className="text-sm text-foreground/60">
          Active sessions are shown here. You can revoke any session to force the user to
          re-authenticate.
        </p>
      </div>
    </div>
  )
}
