'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/shared/logo'
import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [code, setCode] = useState('')
  const [verified, setVerified] = useState(false)
  const [resendCount, setResendCount] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length === 6) {
      setVerified(true)
    }
  }

  const handleResend = () => {
    setResendCount(resendCount + 1)
  }

  if (verified) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">Email verified</h2>
            <p className="mt-4 text-foreground/60">
              Your email has been verified successfully. You can now use all features.
            </p>
          </div>

          <Button asChild className="w-full">
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <Logo className="justify-center mt-4" />
          <h2 className="mt-6 text-3xl font-bold">Verify your email</h2>
          <p className="mt-2 text-foreground/60">
            We've sent a verification code to your email address
          </p>
        </div>

        <Card className="border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="code">Verification code</Label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="mt-1 text-center text-lg tracking-widest font-mono"
              />
              <p className="mt-2 text-xs text-foreground/60">
                Enter the 6-digit code from your email
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={code.length !== 6}>
              Verify email
            </Button>
          </form>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-center text-sm text-foreground/60 mb-4">
              Didn't receive the code?
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleResend}
              disabled={resendCount >= 3}
            >
              {resendCount > 0 
                ? `Resend code (${3 - resendCount} remaining)` 
                : 'Resend code'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
