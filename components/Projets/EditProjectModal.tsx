'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { useProjectStore } from '@/store/projectStore'
import type { Project } from '@/app/services/projectService'
import { AuthProvider, Theme } from '@/types/project'
import { Mail, Chrome, Github } from 'lucide-react'

const AUTH_OPTIONS = [
  { id: 'PASSWORD', label: 'Email & Password', icon: Mail },
  { id: 'GOOGLE',   label: 'Google Auth',      icon: Chrome },
  { id: 'GITHUB',   label: 'GitHub Auth',       icon: Github },
]

const COLOR_OPTIONS = [
  { label: 'Bleu',   value: '#2563EB' },
  { label: 'Violet', value: '#7C3AED' },
  { label: 'Rose',   value: '#DB2777' },
  { label: 'Vert',   value: '#16A34A' },
  { label: 'Orange', value: '#EA580C' },
  { label: 'Slate',  value: '#0F172A' },
]

interface Props {
  project: Project
  onClose: () => void
}

export default function EditProjectModal({ project, onClose }: Props) {
  const { updateProject, isLoading, error, clearError } = useProjectStore()

  const [name, setName] = useState(project.name)
  const [providers, setProviders] = useState<AuthProvider[]>(project.authProviders)
  const [theme, setTheme] = useState<Theme>(project.theme)
  const [primaryColor, setPrimaryColor] = useState(project.primaryColor)

  useEffect(() => {
    clearError()
  }, [])

  const toggleProvider = (id: AuthProvider) => {
    if (id === 'PASSWORD') return
    setProviders((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const handleSave = async () => {
    if (!name.trim()) return
    try {
      await updateProject(project.id, {
        name: name.trim(),
        authProviders: providers,
        theme,
        primaryColor,
      })
      onClose()
    } catch {
      // erreur dans le store
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* OVERLAY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* MODAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl mx-4 max-h-[90vh] overflow-y-auto"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900">Modifier le projet</h2>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"
            >
              <X className="h-4 w-4 text-slate-600" />
            </button>
          </div>

          <div className="space-y-6">
            {/* NOM */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold">Nom du projet</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-xl border-slate-200"
                placeholder="Nom du projet"
              />
            </div>

            {/* PROVIDERS */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold">Méthodes d'authentification</Label>
              <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden">
                <div className="p-2 space-y-1">
                  {AUTH_OPTIONS.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => toggleProvider(option.id as AuthProvider)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border-2",
                        providers.includes(option.id as AuthProvider)
                          ? "bg-blue-50/50 border-blue-100"
                          : "hover:bg-slate-50 border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          providers.includes(option.id as AuthProvider)
                            ? "bg-white text-blue-600 shadow-sm"
                            : "bg-slate-100 text-slate-500"
                        )}>
                          <option.icon className="h-4 w-4" />
                        </div>
                        <span className={cn(
                          "font-bold text-sm",
                          providers.includes(option.id as AuthProvider) ? "text-blue-900" : "text-slate-600"
                        )}>
                          {option.label}
                        </span>
                      </div>
                      <Checkbox
                        checked={providers.includes(option.id as AuthProvider)}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* THEME */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold">Thème</Label>
              <div className="grid grid-cols-2 gap-3">
                {(['LIGHT', 'DARK'] as Theme[]).map((t) => (
                  <div
                    key={t}
                    onClick={() => setTheme(t)}
                    className={cn(
                      "flex items-center justify-center gap-2 p-3 rounded-xl cursor-pointer border-2 font-bold text-sm transition-all",
                      theme === t
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    {t === 'LIGHT' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {t === 'LIGHT' ? 'Light' : 'Dark'}
                  </div>
                ))}
              </div>
            </div>

            {/* COULEUR */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold">Couleur primaire</Label>
              <div className="flex flex-wrap gap-3">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setPrimaryColor(color.value)}
                    title={color.label}
                    className={cn(
                      "h-8 w-8 rounded-full border-2 transition-all",
                      primaryColor === color.value
                        ? "border-slate-900 scale-110 shadow-md"
                        : "border-transparent hover:scale-105"
                    )}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* ERREUR */}
            {error && (
              <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
                {error}
              </p>
            )}

            {/* BOUTONS */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={onClose}
              >
                Annuler
              </Button>
              <Button
                className="flex-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white"
                onClick={handleSave}
                disabled={isLoading || !name.trim()}
              >
                {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
