'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CreditCard, Download } from 'lucide-react'
import { mockBillingInfo, mockPricingPlans } from '@/lib/mock-data'

export default function BillingPage() {
  const paymentHistory = [
    {
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      amount: 99,
      plan: 'Pro',
      status: 'Paid',
    },
    {
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35),
      amount: 99,
      plan: 'Pro',
      status: 'Paid',
    },
    {
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 65),
      amount: 99,
      plan: 'Pro',
      status: 'Paid',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="mt-2 text-foreground/60">
          Manage your subscription and payment methods
        </p>
      </div>

      {/* Current Plan */}
      <Card className="border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold capitalize">{mockBillingInfo.currentPlan} Plan</h2>
            <p className="mt-2 text-foreground/60">
              Next billing date:{' '}
              <span className="font-medium text-foreground">
                {mockBillingInfo.nextBillingDate.toLocaleDateString()}
              </span>
            </p>
            <p className="mt-1 text-foreground/60">
              Monthly spend:{' '}
              <span className="font-medium text-foreground">
                ${mockBillingInfo.monthlySpend.toLocaleString()}
              </span>
            </p>
          </div>
          <div className="text-right">
            <Badge className="mb-4">
              {mockBillingInfo.status === 'active' ? 'Active' : mockBillingInfo.status}
            </Badge>
            <div className="mt-4">
              <Button variant="outline" className="mb-2 w-full">
                Manage Subscription
              </Button>
              <Button className="w-full">Upgrade Plan</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Upgrade Options */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Available Plans</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {mockPricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`border p-6 ${
                plan.name === mockBillingInfo.currentPlan?.charAt(0).toUpperCase() + mockBillingInfo.currentPlan?.slice(1)
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
            >
              <h3 className="font-semibold">{plan.name}</h3>
              {plan.price !== null ? (
                <p className="mt-2 text-2xl font-bold">${plan.price}</p>
              ) : (
                <p className="mt-2 text-lg font-semibold">Custom Pricing</p>
              )}
              <Button className="mt-4 w-full" variant={plan.name === 'Pro' ? 'default' : 'outline'}>
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card className="border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-semibold">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </h2>
            <p className="mt-2 text-foreground/60">Visa ending in 4242</p>
            <p className="text-sm text-foreground/40">Expires 12/25</p>
          </div>
          <Button variant="outline">Update</Button>
        </div>
      </Card>

      {/* Payment History */}
      <Card className="border border-border p-0">
        <div className="border-b border-border p-6">
          <h2 className="font-semibold">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="px-6 py-4 font-semibold">Date</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Plan</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Amount</TableHead>
                <TableHead className="px-6 py-4 font-semibold">Status</TableHead>
                <TableHead className="px-6 py-4 font-semibold text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment, index) => (
                <TableRow
                  key={index}
                  className="border-b border-border hover:bg-background/50"
                >
                  <TableCell className="px-6 py-4 text-sm">
                    {payment.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4">{payment.plan}</TableCell>
                  <TableCell className="px-6 py-4 font-medium">${payment.amount}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
