'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface NavLink {
  href: string
  label: string
  badge?: string
}

const navLinks: NavLink[] = [
  { href: '/features', label: 'Fonctionnalités' },
  { href: '/pricing', label: 'Tarifs' },
  { href: '/docs', label: 'Docs' },
  { href: '/changelog', label: 'Notes de version', badge: 'v2.0' },
]

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // On déclenche l'effet de flou un peu plus tôt pour la fluidité
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    /* FIXED au lieu de STICKY pour une stabilité totale sur tous les navigateurs */
    <header className="fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 pointer-events-none">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pointer-events-auto">
        <nav
          className={cn(
            'flex h-12 items-center justify-between rounded-xl border px-4 transition-all duration-500 ease-in-out',
            scrolled
              ? 'mt-2 border-slate-200/60 bg-white/80 shadow-lg shadow-slate-200/20 backdrop-blur-xl' 
              : 'mt-4 border-slate-200/30 bg-white/60 backdrop-blur-md'
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-6 w-6 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/bouclier.png"
                alt="SecureVault"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900">
              SecureVault
            </span>
          </Link>

          {/* Nav Desktop */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 rounded bg-blue-50 px-1.5 py-0.5 text-[9px] text-blue-600 font-bold uppercase tracking-wider">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Boutons Desktop */}
          <div className="hidden items-center gap-1.5 md:flex">
            <Button variant="ghost" size="sm" asChild className="h-8 px-3 text-[11px] font-bold text-slate-600">
              <Link href="/auth/login">Connexion</Link>
            </Button>

            <Button size="sm" asChild className="h-8 px-4 text-[11px] font-bold bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100 transition-all active:scale-95">
              <Link href="/auth/signup">Démarrer</Link>
            </Button>
          </div>

          {/* Toggle Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-1.5 hover:bg-slate-100 md:hidden transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4 text-slate-600" />
            ) : (
              <Menu className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </nav>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 mx-auto mt-2 max-w-[calc(100%-2rem)] px-0 md:hidden z-[101] pointer-events-auto">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl ring-1 ring-slate-200/50">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                  {link.badge && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full font-bold">{link.badge}</span>}
                </Link>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
              <Button variant="outline" size="sm" asChild className="rounded-xl border-slate-200 py-5 font-bold">
                <Link href="/auth/login">Connexion</Link>
              </Button>
              <Button size="sm" asChild className="rounded-xl bg-blue-600 py-5 shadow-lg shadow-blue-100 font-bold">
                <Link href="/auth/signup">S'inscrire</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}