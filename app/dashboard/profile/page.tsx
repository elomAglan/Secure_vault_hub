'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Bell, 
  Camera,
  KeyRound,
  Fingerprint
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)

  // Simulation de sauvegarde
  const handleSave = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header de la page */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mon Profil</h1>
        <p className="text-slate-500">Gérez vos informations personnelles et vos paramètres de sécurité.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Colonne Gauche: Photo et Quick Actions */}
        <div className="space-y-6">
          <Card className="border-slate-200/60 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-full border-2 border-slate-100 overflow-hidden bg-slate-50">
                    <Image 
                      src="/api/placeholder/150/150" // Remplace par l'avatar réel
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
                <h3 className="mt-4 font-bold text-slate-900">Alexandre Dupont</h3>
                <p className="text-sm text-slate-500">Administrateur</p>
                <div className="mt-4 w-full">
                   <div className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider text-center py-1 rounded-full border border-blue-100">
                    Compte Vérifié
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Statut de sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <Fingerprint className="h-4 w-4" /> Biométrie
                </span>
                <span className="text-green-600 font-medium text-xs">Activé</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> 2FA
                </span>
                <span className="text-amber-500 font-medium text-xs">Recommandé</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne Droite: Formulaires */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Informations Générales */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle>Informations Générales</CardTitle>
                <CardDescription>Mettez à jour vos coordonnées publiques.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input id="firstname" defaultValue="Alexandre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Nom</Label>
                    <Input id="lastname" defaultValue="Dupont" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email professionnel</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input id="email" className="pl-10" defaultValue="alex@securevault.io" />
                  </div>
                </div>
                <Button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="bg-slate-900 text-white"
                >
                  {loading ? "Enregistrement..." : "Sauvegarder les modifications"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sécurité */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-slate-200/60 shadow-sm">
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>Gérez votre mot de passe et vos accès.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Mot de passe</p>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">Modifié il y a 3 mois</span>
                    </div>
                    <p className="text-sm text-slate-500 italic">Dernière mise à jour le 12 nov. 2025</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <KeyRound className="h-4 w-4" /> Modifier
                  </Button>
                </div>
                
                <Separator className="bg-slate-100" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Authentification à deux facteurs (2FA)</p>
                    <p className="text-sm text-slate-500">Ajoutez une couche de sécurité supplémentaire.</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
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
                  <span>Rapports d'activité hebdomadaires</span>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  )
}