export function Logo({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pharelo"
    >
      {/* Beacon body — smooth tapered flame form */}
      <path
        d="M24 40c-1.2-1.8-3.5-5.2-4.2-10.5-.6-4.5-.2-9.8.8-14.2C21.4 12 22.6 10 24 10s2.6 2 3.4 5.3c1 4.4 1.4 9.7.8 14.2-.7 5.3-2.9 8.7-4.2 10.5z"
        fill="currentColor"
        className="text-foreground"
      />
      {/* Glow point at top of flame */}
      <circle cx="24" cy="13" r="2" fill="currentColor" className="text-gold-mist" opacity="0.5" />
      {/* Outer light arc — wide sweep */}
      <path
        d="M8 18c1.5-4.5 4.8-8.2 9-10.5C19.8 6 21.8 5.2 24 5.2s4.2.8 7 2.3c4.2 2.3 7.5 6 9 10.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="text-gold-mist"
        fill="none"
      />
      {/* Inner light arc — tighter */}
      <path
        d="M13 19c1.2-3.2 3.5-5.8 6.2-7.2 1.5-.8 3-.8 4.8-.8s3.3 0 4.8.8c2.7 1.4 5 4 6.2 7.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="text-gold-mist"
        fill="none"
        opacity="0.5"
      />
    </svg>
  )
}
