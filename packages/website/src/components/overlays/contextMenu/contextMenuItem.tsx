import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { ContextMenuItem as RadixContextMenuItem } from "@radix-ui/react-context-menu"
import type { ComponentPropsWithRef, ReactElement } from "react"

export function ContextMenuItem(
    props: ComponentPropsWithRef<typeof RadixContextMenuItem> & {
        leftIcon?: ReactElement
        color?: "default" | "danger"
    },
) {
    const { leftIcon, color = "default", ...rest } = props
    return (
        <RadixContextMenuItem
            {...rest}
            className={cx(
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
                props.className,
            )}
        >
            {leftIcon && <span className={css({ display: "flex", flexShrink: "0" })}>{leftIcon}</span>}
            {props.children}
        </RadixContextMenuItem>
    )
}
