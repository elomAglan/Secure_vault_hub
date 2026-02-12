'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Settings, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { mockProjects } from '@/lib/mock-data'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = mockProjects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-2 text-foreground/60">Manage your authentication projects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <Input
          placeholder="Search projects..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="border border-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-foreground/60">{project.description}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/60">Users</span>
                <span className="font-semibold">{project.users}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${Math.min((project.users / 1500) * 100, 100)}%` }}
                />
              </div>
            </div>

            <Badge
              variant={project.status === 'active' ? 'default' : 'secondary'}
            >
              {project.status}
            </Badge>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-foreground/60">No projects found</p>
        </div>
      )}
    </div>
  )
}
