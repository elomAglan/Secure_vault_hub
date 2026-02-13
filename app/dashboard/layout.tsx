'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { Navbar } from '@/components/dashboard/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // On peut changer bg-background par une couleur légèrement différente (ex: bg-slate-50) 
    // pour créer une séparation visuelle sans utiliser de lignes.
    <div className="flex h-screen bg-slate-50/50 dark:bg-background">
      
      {/* Sidebar : Assure-toi d'enlever 'border-r' dans le fichier sidebar.tsx */}
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar : Assure-toi d'enlever 'border-b' dans navbar.tsx */}
        <Navbar />

        {/* On ajoute un peu de "souffle" autour du contenu */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Tu peux envelopper children dans une div blanche arrondie pour un effet "App" */}
          <div className="h-full w-full rounded-xl bg-background shadow-sm border border-border/50 p-4">
             {children}
          </div>
        </main>
      </div>
    </div>
  )
}