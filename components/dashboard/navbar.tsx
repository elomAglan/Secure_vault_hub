'use client'

import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Menu } from 'lucide-react'
import { NotificationBell } from '@/components/shared/notification-bell'
import { UserMenu } from '@/components/shared/user-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from './sidebar'

import { authApi } from '@/lib/auth'

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout failed', error)
    } finally {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login'
      }
    }
  }

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="flex h-16 items-center justify-between px-6">
        {mounted ? (
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation menu</SheetTitle>
              </SheetHeader>
              <Sidebar mobile onNavigate={() => setSheetOpen(false)} />
            </SheetContent>
          </Sheet>
        ) : (
          <Button variant="ghost" size="icon" className="lg:hidden" aria-hidden>
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div className="hidden flex-1 md:flex md:max-w-xs">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <Input
              placeholder="Search..."
              className="w-full pl-10 pr-4"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {mounted ? (
            <>
              <NotificationBell />
              <UserMenu onLogout={handleLogout} />
            </>
          ) : (
            <>
              <div className="h-9 w-9 rounded-md bg-muted/40" />
              <div className="h-8 w-8 rounded-full bg-muted/40" />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
