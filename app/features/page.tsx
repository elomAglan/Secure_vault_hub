import { Card } from '@/components/ui/card'
import { MarketingHeader } from '@/components/marketing/header'
import { Shield, Zap, Users, Lock, Code, BarChart3, Globe, Smartphone } from 'lucide-react'

export const metadata = {
  title: 'Features - SecureVault',
  description: 'Discover all the powerful features SecureVault offers',
}

export default function FeaturesPage() {
  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, compliance certifications, and regular security audits to keep your data safe.',
    },
    {
      icon: Users,
      title: 'Multi-tenant',
      description: 'Manage users, authentication, and permissions across multiple applications from one dashboard.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-millisecond authentication with global CDN infrastructure for optimal performance.',
    },
    {
      icon: Code,
      title: 'Simple API',
      description: 'RESTful API with comprehensive documentation and SDKs for all popular languages.',
    },
    {
      icon: Lock,
      title: 'Zero Trust',
      description: 'Complete control over authentication flows, policies, and session management.',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Real-time insights into user behavior, login trends, and security events.',
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Handle millions of authentication requests with automatic scaling and failover.',
    },
    {
      icon: Smartphone,
      title: 'Multi-device',
      description: 'Seamless authentication across web, mobile, and desktop applications.',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />

      {/* Header Section */}
      <section className="border-b border-border bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-balance text-4xl font-bold sm:text-5xl">
            Powerful Features for Modern Auth
          </h1>
          <p className="mt-6 text-lg text-foreground/60">
            Everything you need to build secure, scalable authentication systems
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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

      {/* CTA Section */}
      <section className="border-t border-border bg-background/50 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
          <p className="mb-8 text-lg text-foreground/60">
            Experience the power of SecureVault with a free trial. No credit card required.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <a href="/signup" className="inline-block rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90">
              Start Free Trial
            </a>
            <a href="/docs" className="inline-block rounded-lg border border-border px-6 py-3 hover:bg-background/50">
              View Documentation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
