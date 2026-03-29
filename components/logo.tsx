import Image from 'next/image'

export function Logo({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/images/Pharelo-Logo.webp"
      alt="Pharelo"
      width={size}
      height={size}
      className={className}
    />
  )
}
