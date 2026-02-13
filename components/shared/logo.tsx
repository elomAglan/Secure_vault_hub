// components/shared/logo.tsx
export type LogoProps = {
  showText?: boolean
}

export function Logo({ showText = true }: LogoProps) {
  return (
    <div className="flex items-center">
      <img src="/logo.png" alt="Logo" className="h-8 w-8" />
      {showText && <span className="ml-2 font-bold">SecureVault</span>}
    </div>
  )
}
