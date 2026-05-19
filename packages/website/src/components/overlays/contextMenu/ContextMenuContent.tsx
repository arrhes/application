import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { type ComponentPropsWithRef, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useContextMenu } from "./ContextMenuRoot.js"

export function ContextMenuContent({ children, className, ...props }: ComponentPropsWithRef<"div">) {
    const ctx = useContextMenu()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ctx?.open) return
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                ctx?.closeMenu()
            }
        }
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") ctx?.closeMenu()
        }
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [
        ctx?.open,
        ctx?.closeMenu,
    ])

    if (!ctx?.open) return null

    return createPortal(
        <div
            ref={ref}
            {...props}
            style={{
                position: "fixed",
                top: ctx.position.y,
                left: ctx.position.x,
            }}
            className={cx(
                css({
                    backgroundColor: "white",
                    borderRadius: "lg",
                    padding: "0.5em",
                    boxShadow: "lg",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    gap: "0.5rem",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    minWidth: "180px",
                    zIndex: "10",
                }),
                className,
            )}
        >
            {children}
        </div>,
        document.body,
    )
}
