'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Plus,
  MoreVertical,
  Key,
  Copy,
  Check,
  Eye,
  EyeOff,
  Trash2,
  ShieldCheck,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useProjectStore } from '@/store/projectStore'
import { appToast } from '@/lib/toast'

type ApiKeyType = 'Public' | 'Secret'

interface ApiKeyItem {
  id: string
  projectName: string
  key: string
  type: ApiKeyType
  createdAt: string
  status: 'active'
}

export default function ApiKeysPage() {
  const router = useRouter()
  const { projects, fetchProjects, isLoading, error } = useProjectStore()

  const [searchTerm, setSearchTerm] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showSecretId, setShowSecretId] = useState<string | null>(null)

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])

  const apiKeys = useMemo<ApiKeyItem[]>(() => {
    return projects.flatMap((project) => {
      const keys: ApiKeyItem[] = [
        {
          id: `pk-${project.id}`,
          projectName: project.name,
          key: project.publicKey,
          type: 'Public',
          createdAt: project.createdAt,
          status: 'active',
        },
      ]

      if (project.owner) {
        keys.push({
          id: `sk-${project.id}`,
          projectName: project.name,
          key: project.secretKey,
          type: 'Secret',
          createdAt: project.createdAt,
          status: 'active',
        })
      }

      return keys
    })
  }, [projects])

  const filteredKeys = useMemo(() => {
    const query = searchTerm.toLowerCase().trim()

    if (!query) return apiKeys

    return apiKeys.filter((item) =>
      [item.projectName, item.key, item.type].some((value) =>
        value.toLowerCase().includes(query)
      )
    )
  }, [apiKeys, searchTerm])

  const copyToClipboard = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      appToast.error('Copie impossible', 'Le presse-papiers n est pas accessible.')
    }
  }

  const handleRevokeClick = () => {
    appToast.info(
      'Revocation non disponible',
      'Ajoutez un endpoint backend de rotation/revocation pour activer cette action.'
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Key className="h-8 w-8 text-primary" />
            API Keys
          </h1>
          <p className="mt-2 text-foreground/60">
            Utilisez ces cles pour authentifier vos requetes SDK et API.
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => router.push('/first_app')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Key
        </Button>
      </div>

      <Card className="bg-amber-50 border-amber-200 p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-amber-600 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold">Gardez vos cles secretes en securite.</p>
          <p>
            Ne partagez jamais vos cles secretes (sk_...) cote client ou dans des
            depots publics.
          </p>
        </div>
      </Card>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <Input
          placeholder="Rechercher une cle par projet, type ou valeur..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="border border-border p-6 animate-pulse">
              <div className="h-5 bg-slate-100 rounded w-2/3 mb-4" />
              <div className="h-3 bg-slate-100 rounded w-1/3 mb-6" />
              <div className="h-10 bg-slate-100 rounded w-full" />
            </Card>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredKeys.map((apiKey) => (
            <Card
              key={apiKey.id}
              className="border border-border p-6 hover:shadow-md transition-all group"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      apiKey.type === 'Secret' ? 'bg-red-50' : 'bg-blue-50'
                    )}
                  >
                    <Key
                      className={cn(
                        'h-5 w-5',
                        apiKey.type === 'Secret' ? 'text-red-600' : 'text-blue-600'
                      )}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{apiKey.projectName}</h3>
                    <p className="text-xs text-foreground/40 italic">
                      Creee le {new Date(apiKey.createdAt).toLocaleDateString('fr-FR')}
                    </p>
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
                      <DropdownMenuItem
                        className="text-red-600 flex gap-2 cursor-pointer"
                        onClick={handleRevokeClick}
                      >
                        <Trash2 className="h-4 w-4" />
                        Revoker la cle
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

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
                          onClick={() =>
                            setShowSecretId(showSecretId === apiKey.id ? null : apiKey.id)
                          }
                        >
                          {showSecretId === apiKey.id ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={() => void copyToClipboard(apiKey.id, apiKey.key)}
                  >
                    {copiedId === apiKey.id ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full',
                      apiKey.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    )}
                  />
                  {apiKey.status === 'active' ? 'Operationnelle' : 'Revoquee'}
                </div>
                <Button variant="link" className="text-xs h-auto p-0 text-primary">
                  Voir l usage recent
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && filteredKeys.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl">
          <p className="text-foreground/40">Aucune cle trouvee pour cette recherche.</p>
        </div>
      )}
    </div>
  )
}

function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(' ')
}
