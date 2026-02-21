'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Shield } from 'lucide-react'

interface LoadingOverlayProps {
    isVisible: boolean
    message?: string
    subMessage?: string
}

export function LoadingOverlay({
    isVisible,
    message = 'Création de votre compte...',
    subMessage = 'Chiffrement de vos données en cours',
}: LoadingOverlayProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="loading-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex flex-col items-center gap-6 text-center px-8"
                    >
                        {/* Spinner avec icône bouclier au centre */}
                        <div className="relative flex items-center justify-center w-20 h-20">
                            {/* Cercle tournant extérieur */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-600 border-r-blue-400"
                            />
                            {/* Cercle tournant intérieur (sens inverse) */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-2 rounded-full border-[2px] border-transparent border-t-slate-200 border-l-slate-300"
                            />
                            {/* Icône centrale */}
                            <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-200">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        {/* Textes */}
                        <div className="space-y-1.5">
                            <p className="text-lg font-bold text-slate-900">{message}</p>
                            <motion.p
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                                className="text-sm text-slate-500"
                            >
                                {subMessage}
                            </motion.p>
                        </div>

                        {/* Barre de progression indéterminée */}
                        <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                                className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
