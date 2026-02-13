'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface NavLink {
  href: string
  label: string
  badge?: string
}

const navLinks: NavLink[] = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
  { href: '/changelog', label: 'Changelog', badge: 'v2.0' },
]

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Gestion du scroll pour l'effet de verre
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fermer le menu mobile à la redimension
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Empêcher le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60" 
          : "border-b border-transparent bg-background"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo href="/" className="z-50" />

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:items-center md:gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative px-4 py-2 text-sm font-medium text-foreground/70 transition-all hover:text-foreground"
            >
              <span className="relative">
                {link.label}
                {link.badge && (
                  <span className="absolute -top-3 -right-6 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary ring-1 ring-primary/20">
                    {link.badge}
                  </span>
                )}
              </span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 bg-gradient-to-r from-primary to-primary/50 transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button 
            variant="ghost" 
            asChild 
            className="text-foreground/70 hover:bg-primary/5 hover:text-foreground"
          >
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button 
            asChild 
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/auth/signup">
              Get started
              <span className="ml-1.5">→</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "relative z-50 rounded-lg p-2 transition-all hover:bg-accent md:hidden",
            mobileMenuOpen && "bg-accent"
          )}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-300 md:hidden",
            mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={cn(
            "fixed inset-y-0 right-0 z-40 w-full max-w-sm border-l border-border/50 bg-background px-6 py-20 shadow-2xl transition-all duration-300 md:hidden",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            {/* Navigation Links */}
            <div className="flex-1 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground/70 transition-all hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-primary/20">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="space-y-3 pt-6 border-t border-border">
              <Button 
                variant="outline" 
                asChild 
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button 
                asChild 
                className="w-full justify-center bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/auth/signup">
                  Get started free
                  <span className="ml-2">→</span>
                </Link>
              </Button>
              
              {/* Additional mobile info */}
              <p className="text-center text-xs text-foreground/50 pt-4">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}