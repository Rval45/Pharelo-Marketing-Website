// Variant C: Signal Rings — concentric arcs radiating from the beacon logo

import { Logo } from './logo'

export function HeroVariantC() {
  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      {/* Signal rings — SVG arcs */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outermost ring */}
        <circle
          cx="200" cy="200" r="180"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold-mist/[0.08]"
        />
        {/* Ring 4 */}
        <circle
          cx="200" cy="200" r="145"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold-mist/[0.12]"
        />
        {/* Ring 3 */}
        <circle
          cx="200" cy="200" r="110"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gold-mist/[0.18]"
        />
        {/* Ring 2 */}
        <circle
          cx="200" cy="200" r="75"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-bronze/[0.2]"
        />
        {/* Innermost ring */}
        <circle
          cx="200" cy="200" r="42"
          stroke="currentColor"
          strokeWidth="2"
          className="text-bronze/[0.3]"
        />

        {/* Pulsing signal arcs — upper right quadrant */}
        <path
          d="M 270 100 A 130 130 0 0 1 330 200"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-gold-mist/30 signal-pulse"
          style={{ animationDelay: '0s' }}
        />
        <path
          d="M 250 125 A 95 95 0 0 1 305 200"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-gold-mist/25 signal-pulse"
          style={{ animationDelay: '0.6s' }}
        />
        <path
          d="M 237 150 A 62 62 0 0 1 272 200"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-bronze/30 signal-pulse"
          style={{ animationDelay: '1.2s' }}
        />
      </svg>

      {/* Floating labels at ring positions */}
      <div className="absolute top-[52px] right-[40px]">
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/40">
          prepare
        </span>
      </div>
      <div className="absolute bottom-[88px] left-[28px]">
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/40">
          record
        </span>
      </div>
      <div className="absolute top-[140px] left-[16px]">
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/40">
          understand
        </span>
      </div>

      {/* Center — beacon logo */}
      <div className="relative z-10 signal-center-glow">
        <Logo size={56} className="relative z-10" />
      </div>
    </div>
  )
}
