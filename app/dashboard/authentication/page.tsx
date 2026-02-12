'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { mockAuthSettings } from '@/lib/mock-data'
import { Mail, Github, Wand2, Lock } from 'lucide-react'

// 1. Création d'une icône Google personnalisée (Lucide ne la fournit pas)
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.896 4.14-1.236 1.236-3.156 2.472-7.104 2.472-6.24 0-11.232-5.064-11.232-11.304s4.992-11.304 11.232-11.304c3.42 0 6.036 1.344 7.92 3.144l2.256-2.256C18.42 1.152 15.528 0 12.48 0 5.676 0 0 5.7 0 12.6s5.676 12.6 12.48 12.6c3.684 0 6.468-1.2 8.652-3.48 2.244-2.244 2.952-5.412 2.952-7.944 0-.768-.06-1.5-.18-2.184H12.48z"/>
  </svg>
)

export default function AuthenticationPage() {
  const [settings, setSettings] = useState(mockAuthSettings)

  // 2. Définition des méthodes avec 'as const' pour aider TypeScript
  const authMethods = [
    {
      name: 'Email & Password',
      description: 'Allow users to sign up and log in with email and password',
      key: 'emailPassword' as const,
      icon: Mail,
    },
    {
      name: 'Google OAuth',
      description: 'Let users sign in using their Google account',
      key: 'googleOAuth' as const,
      icon: GoogleIcon, // Utilisation de notre icône personnalisée
    },
    {
      name: 'GitHub OAuth',
      description: 'Let users sign in using their GitHub account',
      key: 'githubOAuth' as const,
      icon: Github,
    },
    {
      name: 'Magic Links',
      description: 'Send passwordless magic links via email',
      key: 'magicLinks' as const,
      icon: Wand2,
    },
    {
      name: 'Two-Factor Authentication',
      description: 'Require a second factor to verify identity',
      key: 'twoFactor' as const,
      icon: Lock,
    },
  ]

  const toggleSetting = (key: keyof typeof mockAuthSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Authentication Settings</h1>
        <p className="mt-2 text-foreground/60">
          Configure which authentication methods are available for your application
        </p>
      </div>

      {/* Auth Methods */}
      <div className="space-y-4">
        {authMethods.map((method) => {
          const Icon = method.icon
          const isEnabled = settings[method.key]

          return (
            <Card key={method.key} className="border border-border p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">{method.name}</h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      {method.description}
                    </p>
                    <div className="mt-2">
                      {isEnabled ? (
                        <Badge>Enabled</Badge>
                      ) : (
                        <Badge variant="secondary">Disabled</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={() => toggleSetting(method.key)}
                />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Security Options */}
      <Card className="border border-border p-6">
        <h2 className="mb-6 text-xl font-semibold">Security Options</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Require Email Verification</h3>
              <p className="text-sm text-foreground/60 mt-1">
                Verify email addresses before users can log in
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Password Requirements</h3>
              <p className="text-sm text-foreground/60 mt-1">
                Enforce strong password policies
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Account Lockout</h3>
              <p className="text-sm text-foreground/60 mt-1">
                Lock accounts after failed login attempts
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Session Management */}
      <Card className="border border-border p-6">
        <h2 className="mb-6 text-xl font-semibold">Session Management</h2>

        <div className="space-y-6">
          <div>
            <Label className="block text-sm font-medium mb-2">Session Duration</Label>
            <select 
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              defaultValue="1 hour"
            >
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="2 hours">2 hours</option>
              <option value="24 hours">24 hours</option>
            </select>
          </div>

          <div>
            <Label className="block text-sm font-medium mb-2">Refresh Token Expiration</Label>
            <select 
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              defaultValue="30 days"
            >
              <option value="7 days">7 days</option>
              <option value="30 days">30 days</option>
              <option value="90 days">90 days</option>
              <option value="never">Never expire</option>
            </select>
          </div>
        </div>
      </Card>

      <Button>Save Changes</Button>
    </div>
  )
}