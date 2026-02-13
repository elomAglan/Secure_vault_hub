import { Toaster } from 'sonner'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {/* On ne touche pas au layout global, juste le children */}
        {children}
        <Toaster />
      </body>
    </html>
  )
}
