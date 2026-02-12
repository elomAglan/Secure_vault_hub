'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function NotificationBell() {
  const notificationCount = 3

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {notificationCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-col items-start gap-1 py-2">
          <span className="font-medium text-sm">New user signup</span>
          <span className="text-xs text-muted-foreground">5 minutes ago</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col items-start gap-1 py-2">
          <span className="font-medium text-sm">Session activity detected</span>
          <span className="text-xs text-muted-foreground">15 minutes ago</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-col items-start gap-1 py-2">
          <span className="font-medium text-sm">Webhook delivery failed</span>
          <span className="text-xs text-muted-foreground">1 hour ago</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
