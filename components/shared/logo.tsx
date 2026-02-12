import Link from 'next/link'
import { Lock } from 'lucide-react'

interface LogoProps {
  href?: string
  className?: string
}

export function Logo({ href = '/', className = '' }: LogoProps) {
  const content = (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Lock className="h-5 w-5" />
      </div>
      <span className="font-bold text-lg">SecureVault</span>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
