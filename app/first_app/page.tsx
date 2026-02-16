'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image' 
import { 
  ChevronRight, Layout, Mail, Chrome, Github, 
  User, Phone, ShieldCheck, Lock, Eye 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

// --- CONFIGURATION ---
const AUTH_OPTIONS = [
  { id: 'email', label: 'Email & Password', icon: Mail },
  { id: 'google', label: 'Google Auth', icon: Chrome },
  { id: 'github', label: 'GitHub Auth', icon: Github },
  { id: 'username', label: 'Username', icon: User },
  { id: 'phone', label: 'Phone Number', icon: Phone },
] as const;

export default function CreateAppPage() {
  const router = useRouter()
  const [appName, setAppName] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['email'])
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(false)
  
  // Ref pour le scroll automatique vers le bouton de sauvegarde
  const saveButtonRef = useRef<HTMLDivElement>(null)

  const toggleOption = (id: string) => {
    if (id === 'email') return 
    setSelectedOptions(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  // Fonction de sauvegarde avec validation
  const handleSave = async () => {
    if (!appName) {
      setError(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    setError(false)
    setIsSaving(true)
    setTimeout(() => {
      router.push('/overview') 
    }, 800)
  }

  // Fonction pour ramener l'utilisateur au bouton d'enregistrement
  const scrollToSave = () => {
    saveButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (!appName) {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 lg:p-12 text-slate-900 font-sans selection:bg-blue-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* SECTION GAUCHE : CONFIGURATION */}
        <section className="space-y-8">
          <header>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
              <Layout className="h-4 w-4" />
              Configuration
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Nouvelle Application</h1>
          </header>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-slate-700 font-bold ml-1">Nom de l'app</Label>
              <Input 
                placeholder="Ex: Mon SaaS de Sécurité" 
                value={appName}
                onChange={(e) => {
                    setAppName(e.target.value)
                    if(e.target.value) setError(false)
                }}
                className={cn(
                    "h-12 rounded-xl border-slate-200 focus-visible:ring-blue-600/10 focus-visible:border-blue-600 outline-none transition-all",
                    error && "border-red-500 bg-red-50"
                )}
              />
              {error && <p className="text-red-500 text-xs font-medium ml-1 animate-pulse">Veuillez donner un nom à votre application.</p>}
            </div>

            <div className="space-y-3">
              <Label className="text-slate-700 font-bold text-sm ml-1">Méthodes d'authentification</Label>
              <div className="border border-slate-200 rounded-3xl bg-white shadow-sm overflow-hidden">
                <div className="max-h-[350px] overflow-y-auto p-2 space-y-1 scrollbar-none">
                  {AUTH_OPTIONS.map((option) => (
                    <div 
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={cn(
                        "group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border-2",
                        selectedOptions.includes(option.id) 
                          ? "bg-blue-50/50 border-blue-100" 
                          : "hover:bg-slate-50 border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2.5 rounded-xl",
                          selectedOptions.includes(option.id) ? "bg-white text-blue-600 shadow-sm" : "bg-slate-100 text-slate-500"
                        )}>
                          <option.icon className="h-5 w-5" />
                        </div>
                        <span className={cn("font-bold text-sm", selectedOptions.includes(option.id) ? "text-blue-900" : "text-slate-600")}>
                          {option.label}
                        </span>
                      </div>
                      <Checkbox checked={selectedOptions.includes(option.id)} className="data-[state=checked]:bg-blue-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div ref={saveButtonRef}>
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className={cn(
                      "w-full h-14 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98]",
                      appName 
                        ? "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200" 
                        : "bg-slate-200 text-slate-500"
                  )}
                >
                  {isSaving ? "Création en cours..." : "Enregistrer l'application"}
                  {!isSaving && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
            </div>
          </div>
        </section>

        {/* SECTION DROITE : PREVIEW */}
        <section className="flex flex-col items-center justify-start lg:border-l lg:pl-12 border-slate-200/60 min-h-[600px]">
          <div className="sticky top-12 w-full max-w-[360px] space-y-6">
            
            {/* --- LABEL APERÇU --- */}
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <Eye className="h-4 w-4" />
                    Aperçu de votre interface
                </div>
                <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                </div>
            </div>

            <Card className="w-full bg-white border-slate-200 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] p-10 relative overflow-hidden">
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <div className="h-14 w-14 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-100">
                    <ShieldCheck className="text-white h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl truncate px-2">
                    {appName || "Votre App"}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-11 w-full bg-slate-50 border border-slate-100 rounded-xl flex items-center px-4 text-[12px] text-slate-400 opacity-50">
                      <Mail className="h-4 w-4 mr-3" /> nom@exemple.com
                    </div>
                    <div className="h-11 w-full bg-slate-50 border border-slate-100 rounded-xl flex items-center px-4 text-[12px] text-slate-400 opacity-50">
                      <Lock className="h-4 w-4 mr-3" /> ••••••••
                    </div>
                  </div>
                  
                  {/* --- BOUTON CONNEXION INTERACTIF --- */}
                  <Button 
                    onClick={scrollToSave}
                    className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl h-11 text-[10px] font-black uppercase tracking-widest shadow-md transition-all active:scale-95"
                  >
                    Connexion
                  </Button>
                </div>

                {selectedOptions.length > 1 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                      <div className="relative flex justify-center text-[9px] uppercase font-bold text-slate-300">
                        <span className="bg-white px-3">Ou continuer avec</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <AnimatePresence mode="popLayout">
                        {selectedOptions.filter(id => id !== 'email').map((optId) => {
                          const opt = AUTH_OPTIONS.find(o => o.id === optId);
                          if (!opt) return null;
                          return (
                            <motion.div 
                              key={`prv-${opt.id}`}
                              initial={{ opacity: 0, scale: 0.8 }} 
                              animate={{ opacity: 1, scale: 1 }} 
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="h-11 w-11 rounded-xl border border-slate-100 bg-white shadow-sm flex items-center justify-center text-slate-600"
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

              {/* --- FOOTER AVEC L'ICONE BOUCLIER RETABLIE --- */}
              <div className="mt-12 pt-6 border-t border-slate-50 flex justify-center items-center gap-2 grayscale opacity-40">
                <Image 
                  src="/bouclier.png" 
                  alt="SecureVault Logo" 
                  width={14} 
                  height={14} 
                  className="object-contain"
                />
                <span className="text-[9px] font-bold uppercase tracking-tight">Secured by SecureVault</span>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}