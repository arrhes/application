import type { ReactNode } from "react"

// Provider is a no-op wrapper kept for API compatibility
export function TooltipProvider({ children }: { children: ReactNode; delayDuration?: number }) {
    return <>{children}</>
}
