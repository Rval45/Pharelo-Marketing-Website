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
      {/* Beacon body — tapered vertical form */}
      <path
        d="M24 38c0 0-4-2-5-8-1-6 0-12 1-16 .5-2 1.5-4 4-4s3.5 2 4 4c1 4 2 10 1 16-1 6-5 8-5 8z"
        fill="currentColor"
        className="text-foreground"
      />
      {/* Outer light arc */}
      <path
        d="M10 16c2-6 7-10 14-10s12 4 14 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-gold-mist"
        fill="none"
      />
      {/* Inner light arc */}
      <path
        d="M15 18c1.5-4 4.5-6.5 9-6.5s7.5 2.5 9 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-gold-mist"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}
