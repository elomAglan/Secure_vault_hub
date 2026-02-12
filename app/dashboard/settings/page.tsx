'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-foreground/60">Manage your account and organization settings</p>
      </div>

      {/* Organization Info */}
      <Card className="border border-border p-6">
        <h2 className="mb-6 text-xl font-semibold">Organization Information</h2>

        <div className="space-y-6">
          <div>
            <Label htmlFor="company" className="mb-2 block text-sm font-medium">
              Company Name
            </Label>
            <Input id="company" placeholder="Your Company" defaultValue="Tech Startup Inc." />
          </div>

          <div>
            <Label htmlFor="website" className="mb-2 block text-sm font-medium">
              Website
            </Label>
            <Input id="website" type="url" placeholder="https://example.com" />
          </div>

          <div>
            <Label htmlFor="support-email" className="mb-2 block text-sm font-medium">
              Support Email
            </Label>
            <Input
              id="support-email"
              type="email"
              placeholder="support@example.com"
              defaultValue="support@example.com"
            />
          </div>

          <div>
            <Label htmlFor="description" className="mb-2 block text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Tell us about your organization..."
              defaultValue="We're building amazing authentication solutions."
              rows={4}
            />
          </div>

          <Button>Save Changes</Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="border border-border p-6">
        <h2 className="mb-6 text-xl font-semibold">Notifications</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Login Alerts</h3>
              <p className="text-sm text-foreground/60 mt-1">Get notified of unusual login activity</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Billing Notifications</h3>
              <p className="text-sm text-foreground/60 mt-1">Get notified about billing events</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Security Alerts</h3>
              <p className="text-sm text-foreground/60 mt-1">Get notified of security-related events</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Product Updates</h3>
              <p className="text-sm text-foreground/60 mt-1">Get notified about new features and updates</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card className="border border-border p-6">
        <h2 className="mb-6 text-xl font-semibold">Preferences</h2>

        <div className="space-y-6">
          <div>
            <Label htmlFor="timezone" className="mb-2 block text-sm font-medium">
              Timezone
            </Label>
            <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
              <option>UTC (Coordinated Universal Time)</option>
              <option selected>EST (Eastern Standard Time)</option>
              <option>CST (Central Standard Time)</option>
              <option>PST (Pacific Standard Time)</option>
            </select>
          </div>

          <div>
            <Label htmlFor="language" className="mb-2 block text-sm font-medium">
              Language
            </Label>
            <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
              <option selected>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border border-destructive/50 bg-destructive/5 p-6">
        <h2 className="mb-4 text-xl font-semibold text-destructive">Danger Zone</h2>
        <p className="mb-6 text-sm text-foreground/60">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Download Account Data
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  )
}
