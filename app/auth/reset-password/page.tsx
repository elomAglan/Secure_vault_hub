'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/shared/logo'
import { authService } from '@/app/services/authService'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { Check, X, CheckCircle } from 'lucide-react'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const resetToken = searchParams.get('token')?.trim() ?? ''

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const passwordStrength = {
    hasMinLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
  }

  const isStrongPassword = Object.values(passwordStrength).every(Boolean)
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!resetToken) {
      setError('Reset token is missing. Please use the link from your email.')
      return
    }

    if (!isStrongPassword || !passwordsMatch) {
      return
    }

    setIsLoading(true)
    try {
      await authService.resetPassword(resetToken, formData.password)
      setSubmitted(true)
    } catch (err: unknown) {
      const backendMessage =
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : null

      setError(backendMessage ?? 'Unable to reset password. Please request a new reset link.')
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">Password reset successful</h2>
            <p className="mt-4 text-foreground/60">
              Your password has been reset. You can now sign in with your new password.
            </p>
          </div>

          <Button asChild className="w-full">
            <Link href="/auth/login">Go to login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h2 className="mt-6 text-3xl font-bold">Set new password</h2>
          <p className="mt-2 text-foreground/60">Create a strong password for your account</p>
        </div>

        <Card className="border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!resetToken && (
              <p className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                Invalid or missing reset token. Open the password reset link sent to your email.
              </p>
            )}

            <div>
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading || !resetToken}
                className="mt-1"
              />

              {formData.password && (
                <div className="mt-3 space-y-2">
                  <div className="text-xs font-medium">Password strength:</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      {passwordStrength.hasMinLength ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-foreground/30" />
                      )}
                      <span className={passwordStrength.hasMinLength ? 'text-foreground' : 'text-foreground/50'}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordStrength.hasUpperCase ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-foreground/30" />
                      )}
                      <span className={passwordStrength.hasUpperCase ? 'text-foreground' : 'text-foreground/50'}>
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordStrength.hasLowerCase ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-foreground/30" />
                      )}
                      <span className={passwordStrength.hasLowerCase ? 'text-foreground' : 'text-foreground/50'}>
                        One lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {passwordStrength.hasNumber ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-foreground/30" />
                      )}
                      <span className={passwordStrength.hasNumber ? 'text-foreground' : 'text-foreground/50'}>
                        One number
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading || !resetToken}
                className="mt-1"
              />
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2 text-xs">
                  {passwordsMatch ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-destructive" />
                  )}
                  <span className={passwordsMatch ? 'text-green-600' : 'text-destructive'}>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </span>
                </div>
              )}
            </div>

            {error && (
              <p className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!isStrongPassword || !passwordsMatch || isLoading || !resetToken}
            >
              {isLoading ? 'Resetting password...' : 'Reset password'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ResetPasswordContent />
    </Suspense>
  )
}
