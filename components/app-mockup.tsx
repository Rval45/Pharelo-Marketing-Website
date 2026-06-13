export function AppMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mockup-lift mx-auto w-full max-w-[280px] transition-transform duration-500 ease-out md:hover:-translate-y-1.5">
      {/* Phone frame */}
      <div className="rounded-[2.5rem] bg-gradient-to-b from-surface to-background p-3 ring-1 ring-foreground/10 shadow-[0_30px_60px_-20px_rgba(160,110,50,0.35),0_8px_20px_-8px_rgba(44,36,22,0.18)]">
        {/* Dynamic island notch */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-[5px] rounded-full bg-foreground/15" />
        </div>
        {/* Screen content */}
        <div className="rounded-[1.6rem] bg-gradient-to-b from-surface to-background overflow-hidden min-h-[380px] ring-1 ring-inset ring-foreground/[0.06] shadow-inner">
          {children}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center mt-2.5">
          <div className="w-24 h-1 rounded-full bg-foreground/12" />
        </div>
      </div>
    </div>
  )
}
