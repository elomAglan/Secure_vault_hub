import { Button } from '@/components/ui/button'
import { MarketingHeader } from '@/components/marketing/header'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { mockPricingPlans } from '@/lib/mock-data'

export const metadata = {
  title: 'Pricing - SecureVault',
  description: 'Simple, transparent pricing for authentication management',
}

export default function PricingPage() {
  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes, we offer 20% discount when you commit to annual billing.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, all Pro plans come with a 14-day free trial. No credit card required.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, bank transfers, and purchase orders for enterprise plans.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee on paid plans.',
    },
    {
      question: 'What is included in the Enterprise plan?',
      answer: 'Enterprise plans include custom features, dedicated support, SLA guarantees, and more.',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />

      {/* Pricing Header */}
      <section className="border-b border-border bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-balance text-4xl font-bold sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-foreground/60">
            Choose the perfect plan for your application. Always pay only for what you use.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {mockPricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col p-8 ${
                  plan.highlighted ? 'border-2 border-primary md:scale-105' : 'border border-border'
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-6">Most Popular</Badge>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-foreground/60">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.price !== null ? (
                    <div>
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-foreground/60">/month</span>
                      <p className="mt-2 text-sm text-foreground/60">
                        Billed monthly. Save 20% with annual billing.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-2xl font-semibold">Custom Pricing</span>
                      <p className="mt-2 text-sm text-foreground/60">
                        Tailored to your needs
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  className="mb-8 w-full"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border bg-background/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>

          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="mb-2 font-semibold">{faq.question}</h3>
                <p className="text-foreground/60">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
