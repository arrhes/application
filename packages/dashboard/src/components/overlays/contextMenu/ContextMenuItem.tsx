import { cn, css } from "@comptasse/ui/utilities/cn.js"
import type { ComponentPropsWithRef, ReactElement } from "react"
import { useContextMenu } from "./contextMenuContext.js"

type ContextMenuItemProps = ComponentPropsWithRef<"button"> & {
    leftIcon?: ReactElement
    color?: "default" | "danger"
    onSelect?: () => void
}

export function ContextMenuItem({
    leftIcon,
    color = "default",
    onSelect,
    onClick,
    children,
    className,
    ...props
}: ContextMenuItemProps) {
    const ctx = useContextMenu()
    return (
        <button
            type="button"
            {...props}
            onClick={(e) => {
                ctx?.closeMenu()
                onSelect?.()
                onClick?.(e)
            }}
            className={cn(
                css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.375rem 0.5rem",
                    borderRadius: "md",
                    outline: "none",
                    cursor: "pointer",
                    fontSize: "sm",
                    transition: "all 0.1s",
                    _hover: {
                        backgroundColor: "neutral/5",
                    },
                    _disabled: {
                        opacity: 0.4,
                        cursor: "default",
                        pointerEvents: "none",
                    },
                }),
                color === "danger"
                    ? css({
                          color: "error",
                          _hover: {
                              backgroundColor: "red.50",
                          },
                      })
                    : css({
                          color: "neutral",
                      }),
                className,
            )}
        >
            {leftIcon && (
                <span
                    className={css({
                        display: "flex",
                        flexShrink: "0",
                    })}
                >
                    {leftIcon}
                </span>
            )}
            {children}
        </button>
    )
}
