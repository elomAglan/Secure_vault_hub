'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Filter } from 'lucide-react'
import { useEffect, useState } from 'react'
import { mockActivityLogs } from '@/lib/mock-data'

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredLogs = mockActivityLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getActionColor = (action: string) => {
    if (action.includes('created')) return 'bg-green-100 text-green-800'
    if (action.includes('updated') || action.includes('modified')) return 'bg-blue-100 text-blue-800'
    if (action.includes('deleted') || action.includes('banned')) return 'bg-red-100 text-red-800'
    if (action.includes('regenerated')) return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Activity Logs</h1>
        <p className="mt-2 text-foreground/60">
          Track all actions taken in your account
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <Input
            placeholder="Search logs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Logs Table */}
      <Card className="border border-border p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold">Timestamp</TableHead>
                <TableHead className="px-6 py-4 font-semibold">User</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Action</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow
                  key={log.id}
                  className="border-b border-border hover:bg-background/50"
                >
                  <TableCell className="px-6 py-4 text-sm text-foreground/60">
                    <span suppressHydrationWarning>
                      {mounted ? log.timestamp.toLocaleString() : '--'}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-sm font-medium">{log.userName}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge className={getActionColor(log.action)} variant="outline">
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-foreground/60 max-w-xs truncate">
                    {log.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-foreground/60">No logs found</p>
          </div>
        )}
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/60">
          Showing {filteredLogs.length} of {mockActivityLogs.length} logs
        </p>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
