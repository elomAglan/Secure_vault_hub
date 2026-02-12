'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
  { href: '/features', label: 'Features' },
]

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo href="/" />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Get started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="ghost" asChild className="flex-1">
                  <Link href="/auth/login">Sign in</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/auth/signup">Get started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
