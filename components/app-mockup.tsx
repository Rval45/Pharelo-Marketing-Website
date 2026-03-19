export function AppMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px] transition-transform duration-500 ease-out hover:-translate-y-1">
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border border-border/60 bg-cream-light p-3.5 shadow-[0_24px_48px_-16px_rgba(61,43,31,0.1),0_0_0_1px_rgba(255,252,247,0.4)_inset]">
        {/* Dynamic island notch */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-[5px] rounded-full bg-foreground/10" />
        </div>
        {/* Screen content */}
        <div className="rounded-[1.5rem] bg-background overflow-hidden min-h-[380px]">
          {children}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center mt-2.5">
          <div className="w-24 h-1 rounded-full bg-foreground/8" />
        </div>
      </div>
    </div>
  )
}
