import { MarketingHeader } from '@/components/marketing/header'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

const docLinks = [
  { href: '/docs', label: 'Getting Started', icon: '📘' },
  { href: '/docs/api', label: 'API Reference', icon: '⚙️' },
  { href: '/docs/integration', label: 'Integration Guide', icon: '🔗' },
  { href: '/docs/security', label: 'Security', icon: '🔒' },
  { href: '/docs/webhooks', label: 'Webhooks', icon: '🪝' },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-border bg-background/50 p-6 lg:block">
          <nav className="space-y-2">
            {docLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-background transition-colors"
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 border-l border-border bg-background">
          <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
