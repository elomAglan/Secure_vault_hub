'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/shared/logo'
import Link from 'next/link'
import { useState } from 'react'
import { Check, X } from 'lucide-react'

export default function UserSignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('User signup attempt:', formData)
  }

  const passwordStrength = {
    hasMinLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
  }

  const isStrongPassword = Object.values(passwordStrength).every(Boolean)

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo className="justify-center" />
          <h2 className="mt-6 text-3xl font-bold">Create your account</h2>
          <p className="mt-2 text-foreground/60">
            Join SecureVault and start managing authentication
          </p>
        </div>

        <Card className="border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
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

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!isStrongPassword && formData.password !== ''}
            >
              Create account
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-foreground/60">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>

        <p className="text-center text-xs text-foreground/60">
          By creating an account, you agree to our{' '}
          <Link href="#" className="text-primary hover:underline">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
