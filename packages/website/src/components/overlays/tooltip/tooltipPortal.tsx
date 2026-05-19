import type { ReactNode } from "react"

// Portal is a no-op; TooltipContent handles its own portal rendering
export function TooltipPortal({ children }: { children: ReactNode; container?: Element }) {
    return <>{children}</>
}
