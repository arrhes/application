import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { type ComponentPropsWithRef, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useTooltipRoot } from "./tooltipRoot.js"

type TooltipContentProps = ComponentPropsWithRef<"div"> & {
    sideOffset?: number
}

export function TooltipContent({ sideOffset = 4, children, className, style, ...props }: TooltipContentProps) {
    const ctx = useTooltipRoot()
    const ref = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState<{
        top: number
        left: number
        ready: boolean
    }>({
        top: 0,
        left: 0,
        ready: false,
    })

    useLayoutEffect(() => {
        if (!ctx?.open) {
            setPos((p) => ({
                ...p,
                ready: false,
            }))
            return
        }
        if (!ref.current || !ctx.triggerRef.current) return
        const tr = ctx.triggerRef.current.getBoundingClientRect()
        const cr = ref.current.getBoundingClientRect()
        setPos({
            top: tr.top - cr.height - sideOffset,
            left: Math.max(8, tr.left + tr.width / 2 - cr.width / 2),
            ready: true,
        })
    }, [
        ctx?.open,
        sideOffset,
    ])

    if (!ctx?.open) return null

    return createPortal(
        <div
            ref={ref}
            {...props}
            style={{
                position: "fixed",
                top: pos.top,
                left: pos.left,
                visibility: pos.ready ? "visible" : "hidden",
                ...style,
            }}
            className={cx(
                css({
                    zIndex: "50",
                    overflowY: "auto",
                    maxWidth: "xs",
                    borderRadius: "md",
                    backgroundColor: "neutral",
                    padding: "0.5rem",
                    fontSize: "xs",
                }),
                className,
            )}
        >
            <span
                className={css({
                    color: "white",
                })}
            >
                {children}
            </span>
        </div>,
        document.body,
    )
}
