import { type ReactNode, use, useRef, useState } from "react"
import { TooltipRootContext } from "./tooltipRootContext.js"

export function useTooltipRoot() {
    return use(TooltipRootContext)
}

export function TooltipRoot({ children, delayDuration = 700 }: { children: ReactNode; delayDuration?: number }) {
    const [open, setOpen] = useState(false)
    const triggerRef = useRef<HTMLElement | null>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    function openTooltip() {
        clearTimeout(timerRef.current)
        if (delayDuration === 0) {
            setOpen(true)
        } else {
            timerRef.current = setTimeout(() => setOpen(true), delayDuration)
        }
    }

    function closeTooltip() {
        clearTimeout(timerRef.current)
        setOpen(false)
    }

    return (
        <TooltipRootContext
            value={{
                open,
                openTooltip,
                closeTooltip,
                triggerRef,
            }}
        >
            {children}
        </TooltipRootContext>
    )
}
