export function AppMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px] transition-transform duration-500 ease-out md:hover:-translate-y-1">
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border border-border bg-surface p-3.5 shadow-xl">
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
