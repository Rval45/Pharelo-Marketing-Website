import { type SVGProps } from "react"

/**
 * Minimal lighthouse icon. Simple enough to read at 16-20px,
 * warm and recognizable. Uses currentColor for theming.
 */
export function LighthouseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth ?? 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Light beam (left) */}
      <path d="M3 9l4 1" />
      <path d="M3 13l4 -1" />

      {/* Lantern room */}
      <rect x="9" y="3" width="4" height="4" rx="0.5" />

      {/* Tapered tower */}
      <path d="M9 7l-1 12h8l-1 -12" />

      {/* Base */}
      <path d="M6 19h10" />
    </svg>
  )
}
