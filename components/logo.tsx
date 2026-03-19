import Image from 'next/image'

export function Logo({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/images/Pharelo-Logo.png"
      alt="Pharelo"
      width={size}
      height={size}
      className={className}
    />
  )
}
