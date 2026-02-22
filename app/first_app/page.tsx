'use client'

import React, { useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  ChevronRight, Layout, Mail, Chrome, Github,
  User, Phone, ShieldCheck, Lock, Eye, Sun, Moon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { useProjectStore } from '@/store/projectStore'
import { AuthProvider, Theme } from '@/types/project'
import { LoadingOverlay } from '@/components/shared/LoadingOverlay'

// --- CONFIGURATION ---
const AUTH_OPTIONS = [
  { id: 'PASSWORD', label: 'Email & Password', icon: Mail },
  { id: 'GOOGLE',   label: 'Google Auth',      icon: Chrome },
  { id: 'GITHUB',   label: 'GitHub Auth',       icon: Github },
] as const

const THEME_OPTIONS: { id: Theme; label: string; icon: React.ElementType }[] = [
  { id: 'LIGHT', label: 'Light', icon: Sun },
  { id: 'DARK',  label: 'Dark',  icon: Moon },
]

const COLOR_OPTIONS = [
  { label: 'Bleu',    value: '#2563EB' },
  { label: 'Violet',  value: '#7C3AED' },
  { label: 'Rose',    value: '#DB2777' },
  { label: 'Vert',    value: '#16A34A' },
  { label: 'Orange',  value: '#EA580C' },
  { label: 'Slate',   value: '#0F172A' },
]

export default function CreateAppPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { createProject, isLoading, error, clearError } = useProjectStore()
  const isFromRegister = searchParams.get('from') === 'register'

  const [appName, setAppName]           = useState('')
  const [nameError, setNameError]       = useState(false)
  const [selectedProviders, setSelectedProviders] = useState<AuthProvider[]>(['PASSWORD'])
  const [theme, setTheme]               = useState<Theme>('LIGHT')
  const [primaryColor, setPrimaryColor] = useState('#2563EB')

  const saveButtonRef = useRef<HTMLDivElement>(null)

  const toggleProvider = (id: AuthProvider) => {
    if (id === 'PASSWORD') return
    setSelectedProviders(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const handleSave = async () => {
  if (!appName.trim()) {
    setNameError(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  setNameError(false)
  clearError()

  try {
    await createProject({
      name: appName.trim(),
      authProviders: selectedProviders,
      theme,
      primaryColor,
    })
    router.push(isFromRegister ? '/overview' : '/dashboard/projects')
  } catch {
    // erreur déjà dans le store
  }
}

  const scrollToSave = () => {
    saveButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (!appName) setNameError(true)
  }

  // Couleurs de preview selon le thème
  const isDark = theme === 'DARK'
  const previewBg      = isDark ? '#0F172A' : '#FFFFFF'
  const previewCard    = isDark ? '#1E293B' : '#F8FAFC'
  const previewText    = isDark ? '#F1F5F9' : '#0F172A'
  const previewSubText = isDark ? '#94A3B8' : '#64748B'
  const previewBorder  = isDark ? '#334155' : '#E2E8F0'

  return (
    
    <div className="min-h-screen bg-[#F9FAFB] p-6 lg:p-12 text-slate-900 font-sans selection:bg-blue-100">
        <LoadingOverlay
    isVisible={isLoading}
    message="Création en cours..."
    subMessage="Configuration de votre application"
  />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* ── SECTION GAUCHE ── */}
        <section className="space-y-8">
          <header>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
              <Layout className="h-4 w-4" />
              Configuration
            </div>
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight">Nouvelle Application</h1>
              {isFromRegister && (
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => router.push('/overview')}
                >
                  Skip
                </Button>
              )}
            </div>
          </header>

          <div className="space-y-6">

            {/* NOM */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold ml-1">Nom de l'app</Label>
              <Input
                placeholder="Ex: Mon SaaS de Sécurité"
                value={appName}
                onChange={(e) => {
                  setAppName(e.target.value)
                  if (e.target.value) setNameError(false)
                }}
                className={cn(
                  "h-12 rounded-xl border-slate-200 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 outline-none transition-all",
                  nameError && "border-red-500 bg-red-50"
                )}
              />
              {nameError && (
                <p className="text-red-500 text-xs font-medium ml-1 animate-pulse">
                  Veuillez donner un nom à votre application.
                </p>
              )}
            </div>

            {/* AUTH PROVIDERS */}
            <div className="space-y-3">
              <Label className="text-slate-700 font-bold text-sm ml-1">Méthodes d'authentification</Label>
              <div className="border border-slate-200 rounded-3xl bg-white shadow-sm overflow-hidden">
                <div className="max-h-[350px] overflow-y-auto p-2 space-y-1 scrollbar-none">
                  {AUTH_OPTIONS.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => toggleProvider(option.id as AuthProvider)}
                      className={cn(
                        "group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2",
                        selectedProviders.includes(option.id as AuthProvider)
                          ? "bg-blue-50/50 border-blue-100"
                          : "hover:bg-slate-50 border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2.5 rounded-xl",
                          selectedProviders.includes(option.id as AuthProvider)
                            ? "bg-white text-blue-600 shadow-sm"
                            : "bg-slate-100 text-slate-500"
                        )}>
                          <option.icon className="h-5 w-5" />
                        </div>
                        <span className={cn(
                          "font-bold text-sm",
                          selectedProviders.includes(option.id as AuthProvider) ? "text-blue-900" : "text-slate-600"
                        )}>
                          {option.label}
                        </span>
                      </div>
                      <Checkbox
                        checked={selectedProviders.includes(option.id as AuthProvider)}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* THÈME */}
            <div className="space-y-3">
              <Label className="text-slate-700 font-bold text-sm ml-1">Thème</Label>
              <div className="grid grid-cols-2 gap-3">
                {THEME_OPTIONS.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "flex items-center justify-center gap-2 p-4 rounded-2xl cursor-pointer border-2 font-bold text-sm transition-all",
                      theme === t.id
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    <t.icon className="h-4 w-4" />
                    {t.label}
                  </div>
                ))}
              </div>
            </div>

            {/* COULEUR PRIMAIRE */}
            <div className="space-y-3">
              <Label className="text-slate-700 font-bold text-sm ml-1">Couleur primaire</Label>
              <div className="flex flex-wrap gap-3">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setPrimaryColor(color.value)}
                    title={color.label}
                    className={cn(
                      "h-9 w-9 rounded-full border-2 transition-all",
                      primaryColor === color.value
                        ? "border-slate-900 scale-110 shadow-md"
                        : "border-transparent hover:scale-105"
                    )}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* ERREUR API */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-xl border border-red-100"
              >
                {error}
              </motion.p>
            )}

            {/* BOUTON SAVE */}
            <div ref={saveButtonRef}>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className={cn(
                  "w-full h-14 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98]",
                  appName
                    ? "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200"
                    : "bg-slate-200 text-slate-500"
                )}
              >
                {isLoading ? "Création en cours..." : "Enregistrer l'application"}
                {!isLoading && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </section>

        {/* ── SECTION DROITE : PREVIEW ── */}
        <section className="flex flex-col items-center justify-start lg:border-l lg:pl-12 border-slate-200/60 min-h-[600px]">
          <div className="sticky top-12 w-full max-w-[360px] space-y-6">

            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <Eye className="h-4 w-4" />
                Aperçu de votre interface
              </div>
            </div>

            <Card
              className="w-full border shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] p-10 relative overflow-hidden transition-all duration-300"
              style={{ backgroundColor: previewBg, borderColor: previewBorder }}
            >
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <div
                    className="h-14 w-14 rounded-2xl mx-auto flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <ShieldCheck className="text-white h-8 w-8" />
                  </div>
                  <h3
                    className="font-bold text-xl truncate px-2"
                    style={{ color: previewText }}
                  >
                    {appName || "Votre App"}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div
                      className="h-11 w-full rounded-xl flex items-center px-4 text-[12px] border"
                      style={{ backgroundColor: previewCard, borderColor: previewBorder, color: previewSubText }}
                    >
                      <Mail className="h-4 w-4 mr-3" /> nom@exemple.com
                    </div>
                    <div
                      className="h-11 w-full rounded-xl flex items-center px-4 text-[12px] border"
                      style={{ backgroundColor: previewCard, borderColor: previewBorder, color: previewSubText }}
                    >
                      <Lock className="h-4 w-4 mr-3" /> ••••••••
                    </div>
                  </div>

                  <Button
                    onClick={scrollToSave}
                    className="w-full rounded-xl h-11 text-[10px] font-black uppercase tracking-widest shadow-md transition-all active:scale-95 text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Connexion
                  </Button>
                </div>

                {selectedProviders.length > 1 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" style={{ borderColor: previewBorder }} />
                      </div>
                      <div className="relative flex justify-center text-[9px] uppercase font-bold" style={{ color: previewSubText }}>
                        <span className="px-3" style={{ backgroundColor: previewBg }}>Ou continuer avec</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <AnimatePresence mode="popLayout">
                        {selectedProviders.filter(id => id !== 'PASSWORD').map((optId) => {
                          const opt = AUTH_OPTIONS.find(o => o.id === optId)
                          if (!opt) return null
                          return (
                            <motion.div
                              key={`prv-${opt.id}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="h-11 w-11 rounded-xl border flex items-center justify-center"
                              style={{ backgroundColor: previewCard, borderColor: previewBorder, color: previewText }}
                            >
                              <opt.icon className="h-5 w-5" />
                            </motion.div>
                          )
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12 pt-6 border-t flex justify-center items-center gap-2 grayscale opacity-40" style={{ borderColor: previewBorder }}>
                <Image src="/bouclier.png" alt="SecureVault Logo" width={14} height={14} className="object-contain" />
                <span className="text-[9px] font-bold uppercase tracking-tight" style={{ color: previewSubText }}>
                  Secured by SecureVault
                </span>
              </div>
            </Card>
          </div>
        </section>

      </div>
    </div>
  )
}

