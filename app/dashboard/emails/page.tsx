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
import { Edit, Eye, MoreVertical } from 'lucide-react'
import { mockEmailTemplates } from '@/lib/mock-data'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function EmailsPage() {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      welcome: 'bg-blue-100 text-blue-800',
      verification: 'bg-green-100 text-green-800',
      reset: 'bg-orange-100 text-orange-800',
      invite: 'bg-purple-100 text-purple-800',
      confirm: 'bg-indigo-100 text-indigo-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="mt-2 text-foreground/60">
            Manage your transactional email templates
          </p>
        </div>
        <Button>
          Create Template
        </Button>
      </div>

      {/* SMTP Settings Card */}
      <Card className="border border-border p-6">
        <h2 className="mb-4 font-semibold">SMTP Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">SMTP Server</label>
            <input
              type="text"
              placeholder="smtp.example.com"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Port</label>
              <input
                type="number"
                placeholder="587"
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">From Email</label>
              <input
                type="email"
                placeholder="noreply@example.com"
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>
          </div>
          <Button variant="outline">Test Connection</Button>
        </div>
      </Card>

      {/* Templates Table */}
      <Card className="border border-border p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold">Name</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Type</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Subject</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Last Modified</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmailTemplates.map((template) => (
                <TableRow
                  key={template.id}
                  className="border-b border-border hover:bg-background/50"
                >
                  <TableCell className="px-6 py-4 font-medium">{template.name}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge className={getTypeColor(template.type)} variant="outline">
                      {template.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-foreground/60">
                    {template.subject}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-foreground/60">
                    {template.lastModified.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
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
    </div>
  )
}
