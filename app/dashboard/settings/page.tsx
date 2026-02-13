'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-foreground/60">Manage your account and organization settings</p>
      </div>

      {/* Organization Info */}
      <Card className="border-none bg-background/50 p-6 shadow-sm">
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

          <Button className="w-fit">Save Changes</Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="border-none bg-background/50 p-6 shadow-sm">
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
          
          {/* ... autres notifications identiques ... */}
        </div>
      </Card>

      {/* Preferences */}
      <Card className="border-none bg-background/50 p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Preferences</h2>

        <div className="space-y-6">
          <div>
            <Label htmlFor="timezone" className="mb-2 block text-sm font-medium">
              Timezone
            </Label>
            {/* ✅ Correction : defaultValue sur le select, pas selected sur option */}
            <select 
              id="timezone"
              defaultValue="EST" 
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="UTC">UTC (Coordinated Universal Time)</option>
              <option value="EST">EST (Eastern Standard Time)</option>
              <option value="CST">CST (Central Standard Time)</option>
              <option value="PST">PST (Pacific Standard Time)</option>
            </select>
          </div>

          <div>
            <Label htmlFor="language" className="mb-2 block text-sm font-medium">
              Language
            </Label>
            {/* ✅ Correction : defaultValue sur le select */}
            <select 
              id="language"
              defaultValue="English" 
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-none bg-destructive/5 p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-destructive">Danger Zone</h2>
        <p className="mb-6 text-sm text-foreground/60">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex-1">
            Download Account Data
          </Button>
          <Button variant="destructive" className="flex-1">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  )
}