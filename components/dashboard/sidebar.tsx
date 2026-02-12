'use client'

import Link from 'next/link'
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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/shared/logo'

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Projects',
    href: '/dashboard/projects',
    icon: Package,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    label: 'Sessions',
    href: '/dashboard/sessions',
    icon: Activity,
  },
  {
    label: 'Authentication',
    href: '/dashboard/authentication',
    icon: Shield,
  },
  {
    label: 'Email Templates',
    href: '/dashboard/emails',
    icon: Mail,
  },
  {
    label: 'Webhooks',
    href: '/dashboard/webhooks',
    icon: Webhook,
  },
  {
    label: 'Activity Logs',
    href: '/dashboard/logs',
    icon: FileText,
  },
  {
    label: 'Billing',
    href: '/dashboard/billing',
    icon: CreditCard,
  },
  {
    label: 'Team',
    href: '/dashboard/team',
    icon: Users2,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-border bg-background lg:flex">
      <div className="border-b border-border p-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/70 hover:bg-background/50'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
