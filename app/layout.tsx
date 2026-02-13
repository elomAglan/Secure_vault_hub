import { Toaster } from 'sonner'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#F9FAFB]">
        {/* Le Header est appelé à l'intérieur des pages, 
            donc on s'assure que le body ne bloque pas le sticky */}
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}