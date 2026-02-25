'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit, Eye, MoreVertical, Mail } from 'lucide-react'
import { mockEmailTemplates } from '@/lib/mock-data'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from "sonner" // Assure-toi d'avoir configuré Sonner dans ton layout

export default function EmailsPage() {
  
  // Fonction pour signaler le développement en cours
  const handleDevClick = () => {
    toast.info("Fonctionnalité en cours de développement 🚧", {
      description: "Cette option sera disponible prochainement."
    })
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      welcome: 'bg-blue-100 text-blue-800 border-blue-200',
      verification: 'bg-green-100 text-green-800 border-green-200',
      reset: 'bg-orange-100 text-orange-800 border-orange-200',
      invite: 'bg-purple-100 text-purple-800 border-purple-200',
      confirm: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    }
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  // Traduction des types pour l'affichage
  const translateType = (type: string) => {
    const types: Record<string, string> = {
      welcome: 'Bienvenue',
      verification: 'Vérification',
      reset: 'Réinitialisation',
      invite: 'Invitation',
      confirm: 'Confirmation',
    }
    return types[type] || type
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Modèles d'Emails</h1>
          <p className="mt-2 text-muted-foreground">
            Gérez vos modèles d'emails transactionnels et automatisés.
          </p>
        </div>
        <Button onClick={handleDevClick} className="bg-black hover:bg-black/90 text-white">
          Créer un modèle
        </Button>
      </div>

      {/* SMTP Settings Card */}
      <Card className="border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-blue-600" />
          <h2 className="font-semibold text-slate-900">Configuration SMTP</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700">Serveur SMTP</label>
            <input
              type="text"
              placeholder="smtp.exemple.com"
              className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Port</label>
              <input
                type="number"
                placeholder="587"
                className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Email d'expédition</label>
              <input
                type="email"
                placeholder="noreply@votre-domaine.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>
          <Button variant="outline" onClick={handleDevClick} className="border-slate-300">
            Tester la connexion
          </Button>
        </div>
      </Card>

      {/* Templates Table */}
      <Card className="border border-slate-200 p-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-b border-slate-200 hover:bg-transparent">
                <TableHead className="px-6 py-4 font-bold text-slate-700 uppercase text-[10px] tracking-wider">Nom</TableHead>
                <TableHead className="px-6 py-4 font-bold text-slate-700 uppercase text-[10px] tracking-wider">Type</TableHead>
                <TableHead className="px-6 py-4 font-bold text-slate-700 uppercase text-[10px] tracking-wider">Objet</TableHead>
                <TableHead className="px-6 py-4 font-bold text-slate-700 uppercase text-[10px] tracking-wider">Dernière modification</TableHead>
                <TableHead className="px-6 py-4 font-bold text-slate-700 uppercase text-[10px] tracking-wider text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmailTemplates.map((template) => (
                <TableRow
                  key={template.id}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                >
                  <TableCell className="px-6 py-4 font-bold text-slate-900">{template.name}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge className={`${getTypeColor(template.type)} font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm shadow-none`} variant="outline">
                      {translateType(template.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-slate-500 italic">
                    {template.subject}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-slate-500">
                    {template.lastModified.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={handleDevClick} className="h-8 w-8 text-slate-400 hover:text-blue-600">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleDevClick} className="h-8 w-8 text-slate-400 hover:text-blue-600">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={handleDevClick} className="text-xs">Dupliquer</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDevClick} className="text-xs text-destructive focus:bg-red-50">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
