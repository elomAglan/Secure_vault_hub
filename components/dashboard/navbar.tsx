'use client'

import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Menu } from 'lucide-react'
import { NotificationBell } from '@/components/shared/notification-bell'
import { UserMenu } from '@/components/shared/user-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from './sidebar'

import { authApi } from '@/lib/auth'

export function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout failed', error)
    } finally {
      router.replace('/auth/login')
    }
  }

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Search */}
        <div className="hidden flex-1 md:flex md:max-w-xs">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <Input
              placeholder="Search..."
              className="w-full pl-10 pr-4"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <NotificationBell />

          {/* 👇 on passe la fonction logout au menu */}
          <UserMenu onLogout={handleLogout} />
        </div>
      </div>
    </header>
  )
}

