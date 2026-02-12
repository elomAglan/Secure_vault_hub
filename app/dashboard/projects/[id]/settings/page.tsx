'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { mockProjects } from '@/lib/mock-data'

export default function ProjectSettingsPage({
  params,
}: {
  params: { id: string }
}) {
  const project = mockProjects.find((p) => p.id === params.id) || mockProjects[0]
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{project.name} Settings</h1>
        <p className="mt-2 text-foreground/60">Manage your project configuration</p>
      </div>

      {/* API Keys */}
      <Card className="border border-border p-6">
        <h2 className="mb-6 text-xl font-semibold">API Keys</h2>

        <div className="space-y-6">
          {/* Publishable Key */}
          <div>
            <Label className="mb-2 block text-sm font-medium">Publishable Key</Label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={project.apiKey}
                readOnly
                className="flex-1 font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(project.apiKey, 'api-key')}
              >
                {copied === 'api-key' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="mt-2 text-xs text-foreground/60">
              Use this key in your client-side code
            </p>
          </div>

          {/* Secret Key */}
          <div>
            <Label className="mb-2 block text-sm font-medium">Secret Key</Label>
            <div className="flex items-center gap-2">
              <Input
                type="password"
                value={project.secretKey}
                readOnly
                className="flex-1 font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(project.secretKey, 'secret-key')}
              >
                {copied === 'secret-key' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="mt-2 text-xs text-foreground/60">
              Keep this secret and only use on the server
            </p>
          </div>

          <Button variant="outline">Regenerate Keys</Button>
        </div>
      </Card>

      {/* Environment */}
      <Card className="border border-border p-6">
        <h2 className="mb-6 text-xl font-semibold">Environment</h2>

        <div className="space-y-6">
          <div>
            <Label className="mb-2 block text-sm font-medium">Webhook URL</Label>
            <Input
              type="url"
              placeholder="https://example.com/webhooks"
              className="w-full"
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium">Allowed Origins</Label>
            <Input
              type="text"
              placeholder="https://example.com"
              className="w-full"
            />
            <p className="mt-2 text-xs text-foreground/60">
              Comma-separated list of allowed origins for CORS
            </p>
          </div>

          <Button>Save Changes</Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border border-destructive/50 bg-destructive/5 p-6">
        <h2 className="mb-4 text-xl font-semibold text-destructive">Danger Zone</h2>
        <p className="mb-4 text-sm text-foreground/60">
          These actions cannot be undone. Please proceed with caution.
        </p>
        <Button variant="destructive">Delete Project</Button>
      </Card>
    </div>
  )
}
