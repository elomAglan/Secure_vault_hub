'use client'

import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, Users, Activity, Settings, 
  Shield, Mail, Webhook, FileText, CreditCard, 
  Users2, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

// On sort les données statiques du cycle de rendu pour éviter la re-création mémoire
const NAV_ITEMS = [
  { label: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projets', href: '/dashboard/projects', icon: Package },
  { label: 'Utilisateurs', href: '/dashboard/users', icon: Users },
  { label: 'Sessions', href: '/dashboard/sessions', icon: Activity },
  { label: 'Authentification', href: '/dashboard/authentication', icon: Shield },
  { label: 'Modèles d\'e-mail', href: '/dashboard/emails', icon: Mail },
  { label: 'Webhooks', href: '/dashboard/webhooks', icon: Webhook },
  { label: 'Logs d\'activité', href: '/dashboard/logs', icon: FileText },
  { label: 'Facturation', href: '/dashboard/billing', icon: CreditCard },
  { label: 'Équipe', href: '/dashboard/team', icon: Users2 },
  { label: 'Paramètres', href: '/dashboard/settings', icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Memoïsation du toggle pour éviter les re-renders inutiles des composants enfants
  const toggleSidebar = useCallback(() => setIsCollapsed(prev => !prev), [])

  return (
    <aside
      className={cn(
        'relative hidden h-screen flex-col bg-background transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:flex border-r border-border/50',
        isCollapsed ? 'w-[80px]' : 'w-64'
      )}
    >
      {/* Bouton Toggle optimisé */}
      <div className="absolute -right-3 top-10 z-50">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          size="icon"
          className="h-6 w-6 rounded-full shadow-md border border-border"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.div>
        </Button>
      </div>

      {/* Header Logo - Optimisé avec transform-gpu */}
      <div className={cn('flex h-20 items-center px-6 transition-all', isCollapsed && 'justify-center px-2')}>
        <Link href="/dashboard" className="flex items-center gap-3 will-change-transform">
          <Image 
            src="/bouclier.png" 
            alt="Logo" 
            width={32} 
            height={32} 
            priority // Charge le logo immédiatement
            className="shrink-0 transition-transform active:scale-95"
          />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
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

      {/* Navigation avec LayoutGroup pour fluidifier les mouvements de l'indicateur actif */}
      <LayoutGroup>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4 scrollbar-none overscroll-contain">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard' 
              : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
                  isCollapsed && 'justify-center px-2'
                )}
              >
                {/* Background actif animé */}
                {isActive && (
                  <motion.div 
                    layoutId="active-bg"
                    className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <Icon className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200", 
                  isActive ? "scale-110" : "group-hover:scale-110"
                )} />
                
                {!isCollapsed && (
                  <motion.span 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}

                {isActive && (
                  <motion.div 
                    layoutId="active-bar"
                    className="absolute left-0 h-5 w-1 bg-primary rounded-r-full"
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </LayoutGroup>

      {/* Footer / Déconnexion */}
      <div className="p-4 mt-auto border-t border-border/40">
        <button className={cn(
          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50/50 transition-colors duration-200",
          isCollapsed && "justify-center px-2"
        )}>
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  )
}