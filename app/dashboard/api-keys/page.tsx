'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, Plus, MoreVertical, Key, 
  Copy, Check, Eye, EyeOff, Trash2, ShieldCheck 
} from 'lucide-react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Simulation de données pour les clés API
const mockApiKeys = [
  {
    id: '1',
    name: 'Production Frontend',
    key: 'pk_live_51Nz4X9LpQw0v...',
    type: 'Public',
    created: '12 Oct 2023',
    status: 'active'
  },
  {
    id: '2',
    name: 'Backend Secret (Main)',
    key: 'sk_live_98Hk22MnAs7P...',
    type: 'Secret',
    created: '15 Oct 2023',
    status: 'active'
  },
  {
    id: '3',
    name: 'Test Key Webflow',
    key: 'pk_test_01Gj88BvCc99...',
    type: 'Public',
    created: '02 Nov 2023',
    status: 'revoked'
  }
]

export default function ApiKeysPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showSecretId, setShowSecretId] = useState<string | null>(null)

  const filteredKeys = mockApiKeys.filter((k) =>
    k.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Key className="h-8 w-8 text-primary" />
            API Keys
          </h1>
          <p className="mt-2 text-foreground/60">
            Utilisez ces clés pour authentifier vos requêtes SDK et API.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create New Key
        </Button>
      </div>

      {/* Alerte Sécurité */}
      <Card className="bg-amber-50 border-amber-200 p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-amber-600 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold">Gardez vos clés secrètes en sécurité !</p>
          <p>Ne partagez jamais vos clés secrètes (sk_...) côté client ou dans des dépôts publics.</p>
        </div>
      </Card>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <Input
          placeholder="Rechercher une clé par nom..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* API Keys Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {filteredKeys.map((apiKey) => (
          <Card
            key={apiKey.id}
            className="border border-border p-6 hover:shadow-md transition-all group"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  apiKey.type === 'Secret' ? "bg-red-50" : "bg-blue-50"
                )}>
                  <Key className={cn(
                    "h-5 w-5",
                    apiKey.type === 'Secret' ? "text-red-600" : "text-blue-600"
                  )} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{apiKey.name}</h3>
                  <p className="text-xs text-foreground/40 italic">Créée le {apiKey.created}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={apiKey.type === 'Secret' ? 'destructive' : 'outline'}>
                  {apiKey.type}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-red-600 flex gap-2 cursor-pointer">
                      <Trash2 className="h-4 w-4" />
                      Révoker la clé
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Key Value Display */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/50">
                Token ID
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    readOnly
                    value={apiKey.key}
                    type={apiKey.type === 'Secret' && showSecretId !== apiKey.id ? 'password' : 'text'}
                    className="font-mono text-sm bg-slate-50 pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                     {apiKey.type === 'Secret' && (
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="h-7 w-7"
                         onClick={() => setShowSecretId(showSecretId === apiKey.id ? null : apiKey.id)}
                       >
                         {showSecretId === apiKey.id ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                       </Button>
                     )}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="shrink-0"
                  onClick={() => copyToClipboard(apiKey.id, apiKey.key)}
                >
                  {copiedId === apiKey.id ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Status Footer */}
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  apiKey.status === 'active' ? "bg-green-500" : "bg-red-500"
                )} />
                {apiKey.status === 'active' ? 'Opérationnelle' : 'Révokée'}
              </div>
              <Button variant="link" className="text-xs h-auto p-0 text-primary">
                Voir l'usage récent
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredKeys.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl">
          <p className="text-foreground/40">Aucune clé trouvée pour cette recherche.</p>
        </div>
      )}
    </div>
  )
}

// Fonction utilitaire simple pour fusionner les classes (si non présente dans ton projet)
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}