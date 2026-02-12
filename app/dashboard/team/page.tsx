'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
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
import { Plus, MoreVertical, Mail } from 'lucide-react'
import { mockTeamMembers } from '@/lib/mock-data'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function TeamPage() {
  const [isOpen, setIsOpen] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="mt-2 text-foreground/60">Manage team members and permissions</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
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
                <Input id="email" type="email" placeholder="member@example.com" />
              </div>
              <div>
                <Label htmlFor="role" className="mb-2 block text-sm font-medium">
                  Role
                </Label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                  <option>Member</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsOpen(false)}>Send Invite</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Members Table */}
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
              {mockTeamMembers.map((member) => (
                <TableRow
                  key={member.id}
                  className="border-b border-border hover:bg-background/50"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-foreground/60">
                    {member.email}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="outline" className="capitalize">
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-foreground/60">
                    {member.joinedAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remove Member
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

      {/* Pending Invitations */}
      <Card className="border border-border p-6">
        <h2 className="mb-4 font-semibold">Pending Invitations</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-foreground/40" />
              <div>
                <p className="text-sm font-medium">john@example.com</p>
                <p className="text-xs text-foreground/60">Invited 2 days ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
