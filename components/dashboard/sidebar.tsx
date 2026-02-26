'use client'

import React, { useState, useCallback, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Users,
  Activity,
  Settings,
  Shield,
  Mail,
  Webhook,
  CreditCard,
  Users2,
  ChevronLeft,
  LogOut,
  Key,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { motion, LayoutGroup } from 'framer-motion'
import { authApi } from '@/lib/auth'

/* =========================================================
   CONSTANT (pas recréé à chaque render)
   ========================================================= */

const NAV_ITEMS = [
  { label: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projets', href: '/dashboard/projects', icon: Package },
  { label: 'Cles API', href: '/dashboard/api-keys', icon: Key },
  { label: 'Utilisateurs', href: '/dashboard/users', icon: Users },
  { label: 'Sessions', href: '/dashboard/sessions', icon: Activity },
  { label: 'Authentification', href: '/dashboard/authentication', icon: Shield },
  { label: 'Modeles d email', href: '/dashboard/emails', icon: Mail },
  { label: 'Webhooks', href: '/dashboard/webhooks', icon: Webhook },
  { label: 'Facturation', href: '/dashboard/billing', icon: CreditCard },
  { label: 'Equipe', href: '/dashboard/team', icon: Users2 },
  { label: 'Parametres', href: '/dashboard/settings', icon: Settings },
] as const

type SidebarProps = {
  mobile?: boolean
  onNavigate?: () => void
}

/* =========================================================
   COMPONENT
   ========================================================= */

function SidebarComponent({ mobile = false, onNavigate }: SidebarProps) {
  const pathname = usePathname() // SSR safe
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((p) => !p)
  }, [])

  const handleLogout = async () => {
    await authApi.logout()
    window.location.href = '/auth/login'
  }

  return (
    <aside
      className={cn(
        mobile
          ? 'relative flex h-full w-full flex-col bg-background'
          : 'relative hidden h-screen flex-col bg-background border-r border-border/50 transition-[width] duration-300 lg:flex',
        !mobile && (isCollapsed ? 'w-[80px]' : 'w-64')
      )}
    >
      {/* Collapse button */}
      {!mobile && (
        <div className="absolute -right-3 top-10 z-50">
          <Button onClick={toggleSidebar} size="icon" variant="secondary">
            <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>
      )}

      {/* Logo */}
      <div
        className={cn(
          'flex h-20 items-center px-6',
          isCollapsed && !mobile && 'justify-center'
        )}
      >
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image src="/bouclier.png" alt="Logo" width={32} height={32} priority />

          {(!isCollapsed || mobile) && (
            <span className="text-xl font-bold tracking-tight">
              SecureVault
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <LayoutGroup>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon

            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-accent/50',
                  isCollapsed && !mobile && 'justify-center px-2'
                )}
              >
                {/* Toujours rendu → 0 mismatch */}
                <motion.div
                  layoutId="active-bg"
                  className={cn(
                    'absolute inset-0 rounded-xl transition-opacity',
                    isActive ? 'bg-primary/10 opacity-100' : 'opacity-0'
                  )}
                />

                <Icon className="h-5 w-5 shrink-0" />

                {(!isCollapsed || mobile) && (
                  <span className="truncate">{item.label}</span>
                )}

                <motion.div
                  layoutId="active-bar"
                  className={cn(
                    'absolute left-0 h-5 w-1 rounded-r-full transition-opacity',
                    isActive ? 'bg-primary opacity-100' : 'opacity-0'
                  )}
                />
              </Link>
            )
          })}
        </nav>
      </LayoutGroup>

      {/* Logout */}
      <div className="p-4 mt-auto border-t border-border/40">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 text-red-500"
        >
          <LogOut className="h-5 w-5" />
          {(!isCollapsed || mobile) && <span>Deconnexion</span>}
        </button>
      </div>
    </aside>
  )
}

/* =========================================================
   MEMO (perf ++)
   ========================================================= */

export const Sidebar = memo(SidebarComponent)