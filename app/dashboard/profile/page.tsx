'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  ShieldCheck,
  Bell,
  Camera,
  KeyRound,
  Fingerprint,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Image from 'next/image'

import { appToast } from '@/lib/toast'
import { profileService } from '@/app/services/profileService'

export default function ProfilePage() {
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoadingProfile(true)
      setError(null)

      try {
        const profile = await profileService.getProfile()
        setFirstName(profile.firstName)
        setLastName(profile.lastName)
        setEmail(profile.email)
        setRole(profile.role)
      } catch (err: any) {
        const message = err?.response?.data?.message || 'Erreur lors du chargement du profil'
        setError(message)
      } finally {
        setIsLoadingProfile(false)
      }
    }

    void loadProfile()
  }, [])

  const fullName = useMemo(() => {
    const name = `${firstName} ${lastName}`.trim()
    return name || 'Utilisateur'
  }, [firstName, lastName])

  const handleSaveProfile = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      appToast.error('Champs requis', 'Veuillez remplir prenom, nom et email.')
      return
    }

    setIsSavingProfile(true)
    setError(null)

    try {
      const updated = await profileService.updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      })

      setFirstName(updated.firstName)
      setLastName(updated.lastName)
      setEmail(updated.email)
      setRole(updated.role)
      appToast.success('Profil mis a jour')
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Erreur lors de la mise a jour du profil'
      setError(message)
      appToast.error('Mise a jour echouee', message)
    } finally {
      setIsSavingProfile(false)
    }
  }

  const openPasswordDialog = () => {
    setCurrentPassword('')
    setNewPassword('')
    setIsPasswordDialogOpen(true)
  }

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      appToast.error('Champs requis', 'Saisissez votre mot de passe actuel et le nouveau.')
      return
    }

    if (newPassword.length < 8) {
      appToast.error('Mot de passe invalide', 'Le nouveau mot de passe doit contenir au moins 8 caracteres.')
      return
    }

    setIsChangingPassword(true)
    setError(null)

    try {
      await profileService.changePassword({
        currentPassword,
        newPassword,
      })

      setIsPasswordDialogOpen(false)
      setCurrentPassword('')
      setNewPassword('')
      appToast.success('Mot de passe modifie avec succes')
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Erreur lors de la modification du mot de passe'
      setError(message)
      appToast.error('Modification echouee', message)
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mon Profil</h1>
        <p className="text-slate-500">Gerez vos informations personnelles et vos parametres de securite.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card className="border-slate-200/60 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-full border-2 border-slate-100 overflow-hidden bg-slate-50">
                    <Image
                      src="/api/placeholder/150/150"
                      alt="Avatar"
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition-colors">
                    <Camera className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{isLoadingProfile ? 'Chargement...' : fullName}</h3>
                <p className="text-sm text-slate-500">{role || 'Utilisateur'}</p>
                <div className="mt-4 w-full">
                  <div className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider text-center py-1 rounded-full border border-blue-100">
                    Compte verifie
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Statut de securite</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <Fingerprint className="h-4 w-4" /> Biometrie
                </span>
                <span className="text-green-600 font-medium text-xs">Active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> 2FA
                </span>
                <span className="text-amber-500 font-medium text-xs">Recommande</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle>Informations generales</CardTitle>
                <CardDescription>Mettez a jour vos coordonnees publiques.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">Prenom</Label>
                    <Input
                      id="firstname"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isLoadingProfile || isSavingProfile}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Nom</Label>
                    <Input
                      id="lastname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={isLoadingProfile || isSavingProfile}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email professionnel</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoadingProfile || isSavingProfile}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => void handleSaveProfile()}
                  disabled={isLoadingProfile || isSavingProfile}
                  className="bg-slate-900 text-white"
                >
                  {isSavingProfile ? 'Enregistrement...' : 'Sauvegarder les modifications'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle>Securite du compte</CardTitle>
                <CardDescription>Gerez votre mot de passe et vos acces.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Mot de passe</p>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">Modification manuelle</span>
                    </div>
                    <p className="text-sm text-slate-500 italic">Le backend force la revocation des sessions apres changement.</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2" onClick={openPasswordDialog}>
                    <KeyRound className="h-4 w-4" /> Modifier
                  </Button>
                </div>

                <Separator className="bg-slate-100" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Authentification a deux facteurs (2FA)</p>
                    <p className="text-sm text-slate-500">Ajoutez une couche de securite supplementaire.</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-slate-200/60 shadow-sm bg-slate-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" /> Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span>Alertes de connexion suspecte</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Rapports d activite hebdomadaires</span>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le mot de passe</DialogTitle>
            <DialogDescription>
              Entrez votre mot de passe actuel puis un nouveau mot de passe.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isChangingPassword}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isChangingPassword}
              />
              <p className="text-xs text-slate-500">Minimum 8 caracteres.</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)} disabled={isChangingPassword}>
              Annuler
            </Button>
            <Button onClick={() => void handleChangePassword()} disabled={isChangingPassword}>
              {isChangingPassword ? 'Modification...' : 'Mettre a jour'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
