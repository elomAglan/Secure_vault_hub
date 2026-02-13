'use client'

import { MarketingHeader } from '@/components/marketing/header'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  BookOpen, 
  Settings, 
  Link as LinkIcon, 
  ShieldCheck, 
  Webhook 
} from 'lucide-react'

const docLinks = [
  { href: '/docs', label: 'Bien démarrer', icon: BookOpen },
  { href: '/docs/api', label: 'Référence API', icon: Settings },
  { href: '/docs/integration', label: 'Guide d’intégration', icon: LinkIcon },
  { href: '/docs/security', label: 'Sécurité', icon: ShieldCheck },
  { href: '/docs/webhooks', label: 'Webhooks', icon: Webhook },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <MarketingHeader />

      <div className="mx-auto flex w-full max-w-7xl flex-1 items-start gap-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* Sidebar dans un petit carré cool */}
        <aside className="sticky top-24 hidden w-64 lg:block">
          <Card className="border-slate-200/60 bg-white p-4 shadow-sm">
            <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Documentation
            </p>
            <nav className="space-y-1">
              {docLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/5"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isActive ? "text-blue-600" : "text-slate-400")} />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm min-h-[70vh]">
          <div className="mx-auto max-w-3xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}