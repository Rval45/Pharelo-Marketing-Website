import Image from 'next/image'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/images/Pharelo_Logo.webp"
      alt="Pharelo"
      width={36}
      height={36}
      className={className}
    />
  )
}
