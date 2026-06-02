import { createContext, type MutableRefObject } from "react"

export type TooltipRootContextValue = {
    open: boolean
    openTooltip: () => void
    closeTooltip: () => void
    triggerRef: MutableRefObject<HTMLElement | null>
}

export const TooltipRootContext = createContext<TooltipRootContextValue | null>(null)
