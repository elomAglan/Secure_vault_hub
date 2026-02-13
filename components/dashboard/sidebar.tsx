'use client'

import { useState } from 'react'
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
  FileText,
  CreditCard,
  Users2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type NavItem = {
  label: string
  href: string
  icon: any 
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/dashboard/projects', icon: Package },
  { label: 'Users', href: '/dashboard/users', icon: Users },
  { label: 'Sessions', href: '/dashboard/sessions', icon: Activity },
  { label: 'Authentication', href: '/dashboard/authentication', icon: Shield },
  { label: 'Email Templates', href: '/dashboard/emails', icon: Mail },
  { label: 'Webhooks', href: '/dashboard/webhooks', icon: Webhook },
  { label: 'Activity Logs', href: '/dashboard/logs', icon: FileText },
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { label: 'Team', href: '/dashboard/team', icon: Users2 },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <aside
      className={cn(
        'relative hidden h-screen flex-col bg-background transition-all duration-300 lg:flex',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Bouton Collapse Flottant */}
      <div className="absolute -right-3 top-10 z-50">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className="h-6 w-6 rounded-full bg-background p-0 shadow-md hover:bg-accent border-none"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Section Logo (Sans bordure basse) */}
      <div className={cn(
        'flex h-20 items-center px-6', 
        isCollapsed && 'justify-center px-2'
      )}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image 
            src="/bouclier.png" 
            alt="Logo" 
            width={35} 
            height={35} 
            className="shrink-0"
          />
          {!isCollapsed && (
            <span className="text-xl font-bold tracking-tight truncate">
              SecureVault
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary/10 text-primary' // Style plus doux sans bordures
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
                isCollapsed && 'justify-center px-2'
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer (Sans bordure haute) */}
      {!isCollapsed && (
        <div className="p-6">
          <div className="rounded-lg bg-accent/30 p-3">
            <p className="text-[10px] text-muted-foreground text-center font-medium">
              SECURE VAULT v1.0
            </p>
          </div>
        </div>
      )}
    </aside>
  )
}