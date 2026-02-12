'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/shared/logo'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">Check your email</h2>
            <p className="mt-4 text-foreground/60">
              We've sent a password reset link to <br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </div>

          <Card className="border border-border p-6">
            <p className="text-center text-sm text-foreground/60 mb-6">
              Didn't receive the email? Check your spam folder or try another email address.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Back to login</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo className="justify-center" />
          <h2 className="mt-6 text-3xl font-bold">Reset your password</h2>
          <p className="mt-2 text-foreground/60">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <Card className="border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
        </Card>

        <Link 
          href="/login" 
          className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  )
}
