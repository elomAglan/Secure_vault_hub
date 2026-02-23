'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { appToast } from '@/lib/toast'
import { clearTokens } from '@/lib/api'
import { profileService } from '@/app/services/profileService'

export default function SettingsPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteStep, setDeleteStep] = useState<1 | 2>(1)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [companyName, setCompanyName] = useState('')
  const [website, setWebsite] = useState('')
  const [supportEmail, setSupportEmail] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const settings = await profileService.getSettings()
        setCompanyName(settings.companyName ?? '')
        setWebsite(settings.website ?? '')
        setSupportEmail(settings.supportEmail ?? '')
        setDescription(settings.description ?? '')
      } catch (err: any) {
        const message = err?.response?.data?.message || 'Erreur lors du chargement des paramètres'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    void loadSettings()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)

    try {
      const updated = await profileService.updateSettings({
        companyName: companyName.trim(),
        website: website.trim(),
        supportEmail: supportEmail.trim(),
        description: description.trim(),
      })

      setCompanyName(updated.companyName ?? '')
      setWebsite(updated.website ?? '')
      setSupportEmail(updated.supportEmail ?? '')
      setDescription(updated.description ?? '')
      appToast.success('Paramètres enregistrés')
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Erreur lors de la sauvegarde'
      setError(message)
      appToast.error('Sauvegarde échouée', message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      await profileService.deleteAccount()
      clearTokens()
      appToast.success('Compte supprimé avec succès')
      setIsDeleteDialogOpen(false)
      router.replace('/auth/login')
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Erreur lors de la suppression du compte'
      setError(message)
      appToast.error('Suppression échouée', message)
    } finally {
      setIsDeleting(false)
    }
  }

  const openDeleteDialog = (open: boolean) => {
    setIsDeleteDialogOpen(open)
    if (!open) {
      setDeleteStep(1)
      setDeleteConfirmText('')
    }
  }

  return (
    <div className="max-w-3xl space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="mt-2 text-foreground/60">Gérez votre compte et les paramètres de votre organisation</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl">
          {error}
        </div>
      )}

      <Card className="border-none bg-background/50 p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Informations sur l'organisation</h2>

        <div className="space-y-6">
          <div>
            <Label htmlFor="company" className="mb-2 block text-sm font-medium">
              Nom de l'entreprise
            </Label>
            <Input
              id="company"
              placeholder="Votre entreprise"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              disabled={isLoading || isSaving}
            />
          </div>

          <div>
            <Label htmlFor="website" className="mb-2 block text-sm font-medium">
              Site Web
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="https://exemple.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              disabled={isLoading || isSaving}
            />
          </div>

          <div>
            <Label htmlFor="support-email" className="mb-2 block text-sm font-medium">
              Email de support
            </Label>
            <Input
              id="support-email"
              type="email"
              placeholder="support@exemple.com"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              disabled={isLoading || isSaving}
            />
          </div>

          <div>
            <Label htmlFor="description" className="mb-2 block text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Parlez-nous de votre organisation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              disabled={isLoading || isSaving}
            />
          </div>

          <Button className="w-fit" onClick={() => void handleSave()} disabled={isLoading || isSaving}>
            {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </Button>
        </div>
      </Card>

      <Card className="border-none bg-background/50 p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Notifications</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Alertes de connexion</h3>
              <p className="text-sm text-foreground/60 mt-1">Soyez notifié en cas d'activité de connexion inhabituelle</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Notifications de facturation</h3>
              <p className="text-sm text-foreground/60 mt-1">Recevez des alertes concernant vos factures et abonnements</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="border-none bg-background/50 p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Préférences</h2>

        <div className="space-y-6">
          <div>
            <Label htmlFor="timezone" className="mb-2 block text-sm font-medium">
              Fuseau horaire
            </Label>
            <select
              id="timezone"
              defaultValue="EST"
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:outline-none text-sm"
            >
              <option value="UTC">UTC (Temps Universel Coordonné)</option>
              <option value="EST">EST (Heure Normale de l'Est)</option>
              <option value="CST">CST (Heure Normale du Centre)</option>
              <option value="PST">PST (Heure Normale du Pacifique)</option>
            </select>
          </div>

          <div>
            <Label htmlFor="language" className="mb-2 block text-sm font-medium">
              Langue
            </Label>
            <select
              id="language"
              defaultValue="French"
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:outline-none text-sm"
            >
              <option value="English">Anglais</option>
              <option value="Spanish">Espagnol</option>
              <option value="French">Français</option>
              <option value="German">Allemand</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="border-none bg-destructive/5 p-6 shadow-sm border border-destructive/20">
        <h2 className="mb-4 text-xl font-semibold text-destructive">Zone de danger</h2>
        <p className="mb-6 text-sm text-foreground/60">
          Ces actions sont irréversibles. Veuillez procéder avec prudence.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex-1">
            Télécharger les données du compte
          </Button>
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={openDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex-1" disabled={isDeleting}>
                {isDeleting ? 'Suppression...' : 'Supprimer le compte'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer le compte définitivement ?</AlertDialogTitle>
                {deleteStep === 1 ? (
                  <AlertDialogDescription>
                    Cette action est irréversible. Vos données de profil et tous les projets associés seront définitivement effacés.
                  </AlertDialogDescription>
                ) : (
                  <AlertDialogDescription>
                    Confirmation finale : tapez <strong>SUPPRIMER</strong> pour confirmer la suppression définitive de votre compte.
                  </AlertDialogDescription>
                )}
              </AlertDialogHeader>

              {deleteStep === 2 && (
                <Input
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Tapez SUPPRIMER"
                  disabled={isDeleting}
                  className="uppercase"
                />
              )}

              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
                {deleteStep === 1 ? (
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={isDeleting}
                    onClick={(event) => {
                      event.preventDefault()
                      setDeleteStep(2)
                    }}
                  >
                    Continuer
                  </AlertDialogAction>
                ) : (
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={isDeleting || deleteConfirmText !== 'SUPPRIMER'}
                    onClick={(event) => {
                      event.preventDefault()
                      void handleDeleteAccount()
                    }}
                  >
                    {isDeleting ? 'Suppression...' : 'Supprimer définitivement'}
                  </AlertDialogAction>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </div>
  )
} 