import type { ComponentPropsWithRef } from "react"
import { useTooltipRoot } from "./tooltipRoot.js"

export function TooltipTrigger({ children, ...props }: ComponentPropsWithRef<"button">) {
    const ctx = useTooltipRoot()
    return (
        <button
            type="button"
            {...props}
            ref={(el) => {
                if (ctx) ctx.triggerRef.current = el
                if (typeof props.ref === "function") props.ref(el)
                else if (props.ref) (props.ref as React.MutableRefObject<HTMLButtonElement | null>).current = el
            }}
            onMouseEnter={(e) => {
                ctx?.openTooltip()
                props.onMouseEnter?.(e)
            }}
            onMouseLeave={(e) => {
                ctx?.closeTooltip()
                props.onMouseLeave?.(e)
            }}
            onFocus={(e) => {
                ctx?.openTooltip()
                props.onFocus?.(e)
            }}
            onBlur={(e) => {
                ctx?.closeTooltip()
                props.onBlur?.(e)
            }}
        >
            {children}
        </button>
    )
}
