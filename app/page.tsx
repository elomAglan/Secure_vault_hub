import { Button } from '@/components/ui/button'
import { MarketingHeader } from '@/components/marketing/header'
import Link from 'next/link'
import { ArrowRight, Check, Shield, Zap, Users, Lock, Code } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with encryption and compliance',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-millisecond authentication with global CDN',
    },
    {
      icon: Users,
      title: 'Multi-tenant',
      description: 'Manage users across multiple applications',
    },
    {
      icon: Lock,
      title: 'Zero Trust',
      description: 'Complete control over authentication flows',
    },
    {
      icon: Code,
      title: 'Simple API',
      description: 'RESTful API for seamless integration',
    },
    {
      icon: Zap,
      title: 'Webhooks',
      description: 'Real-time event notifications',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up for SecureVault and create your first project in minutes',
    },
    {
      number: '02',
      title: 'Configure Auth',
      description: 'Choose your authentication methods and customize settings',
    },
    {
      number: '03',
      title: 'Integrate SDK',
      description: 'Add our SDK to your application with just a few lines of code',
    },
    {
      number: '04',
      title: 'Go Live',
      description: 'Deploy to production and manage users from our dashboard',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-background to-background/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-block rounded-full border border-border px-4 py-2">
              <p className="text-sm font-medium text-foreground/70">
                Join 10,000+ companies securing their applications
              </p>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold sm:text-5xl lg:text-6xl">
              Authentication Made{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Simple & Secure
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-balance text-lg text-foreground/60">
              SecureVault provides enterprise-grade authentication management for modern
              applications. Support multiple login methods, manage sessions, and scale
              effortlessly.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link href="/auth/signup">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 text-center sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold">99.99%</p>
              <p className="text-sm text-foreground/60">Uptime SLA</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100ms</p>
              <p className="text-sm text-foreground/60">Avg Response Time</p>
            </div>
            <div>
              <p className="text-3xl font-bold">10B+</p>
              <p className="text-sm text-foreground/60">Auth Events/Month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Powerful Features</h2>
            <p className="text-lg text-foreground/60">Everything you need to manage authentication</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border border-border p-6">
                  <Icon className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-foreground/60">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-background/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
            <p className="text-lg text-foreground/60">Get up and running in just 4 steps</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number}>
                <div className="mb-4 rounded-lg bg-primary/10 p-3 inline-block">
                  <span className="text-lg font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="mb-2 font-semibold">{step.title}</h3>
                <p className="text-sm text-foreground/60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="border-t border-border bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">Ready to secure your application?</h2>
          <p className="mb-8 text-lg opacity-90">
            Join thousands of developers building with SecureVault
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/signup">Start Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
