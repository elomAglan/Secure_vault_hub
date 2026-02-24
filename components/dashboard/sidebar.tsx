'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
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
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { authApi } from '@/lib/auth'

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

export function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = useCallback(() => setIsCollapsed((prev) => !prev), [])

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
    <aside
      className={cn(
        mobile
          ? 'relative flex h-full w-full flex-col bg-background'
          : 'relative hidden h-screen flex-col bg-background transition-[width] duration-300 ease-in-out lg:flex border-r border-border/50',
        !mobile && (isCollapsed ? 'w-[80px]' : 'w-64')
      )}
    >
      {!mobile && (
        <div className="absolute -right-3 top-10 z-50">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            size="icon"
            className="h-6 w-6 rounded-full shadow-md border border-border"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>
      )}

      <div className={cn('flex h-20 items-center px-6 transition-all', isCollapsed && !mobile && 'justify-center px-2')}>
        <Link href="/dashboard" className="flex items-center gap-3 will-change-transform">
          <Image
            src="/bouclier.png"
            alt="Logo"
            width={32}
            height={32}
            priority
            className="shrink-0 transition-transform active:scale-95"
          />
          <AnimatePresence mode="wait">
            {(!isCollapsed || mobile) && (
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                className="text-xl font-bold tracking-tight whitespace-nowrap bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
              >
                SecureVault
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <LayoutGroup>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4 scrollbar-none overscroll-contain">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
                  isCollapsed && !mobile && 'justify-center px-2'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-bg"
                    className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <Icon
                  className={cn(
                    'h-5 w-5 shrink-0 transition-transform duration-200',
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  )}
                />

                {(!isCollapsed || mobile) && (
                  <motion.span layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="truncate">
                    {item.label}
                  </motion.span>
                )}

                {isActive && (
                  <motion.div layoutId="active-bar" className="absolute left-0 h-5 w-1 bg-primary rounded-r-full" />
                )}
              </Link>
            )
          })}
        </nav>
      </LayoutGroup>

      <div className="p-4 mt-auto border-t border-border/40">
        <button
          onClick={() => {
            void handleLogout()
            onNavigate?.()
          }}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50/50 transition-colors duration-200',
            isCollapsed && !mobile && 'justify-center px-2'
          )}
        >
          <LogOut className="h-5 w-5" />
          {(!isCollapsed || mobile) && <span>Deconnexion</span>}
        </button>
      </div>
    </aside>
  )
}
