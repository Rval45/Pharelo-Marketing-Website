export function AppMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px]">
      {/* Phone frame */}
      <div className="rounded-[2rem] border border-border bg-cream-light p-3 shadow-[0_20px_40px_-15px_rgba(61,43,31,0.08)]">
        {/* Screen notch */}
        <div className="flex justify-center mb-2">
          <div className="w-20 h-1 rounded-full bg-border" />
        </div>
        {/* Screen content */}
        <div className="rounded-[1.25rem] bg-background overflow-hidden min-h-[380px]">
          {children}
        </div>
      </div>
    </div>
  )
}
