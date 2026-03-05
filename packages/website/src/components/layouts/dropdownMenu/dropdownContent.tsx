import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { DropdownMenuContent, DropdownMenuPortal } from "@radix-ui/react-dropdown-menu"
import type { ComponentPropsWithRef } from "react"

export function DropdownContent(props: ComponentPropsWithRef<typeof DropdownMenuContent>) {
    return (
        <DropdownMenuPortal>
            <DropdownMenuContent
                {...props}
                align={props.align || "start"}
                alignOffset={props.alignOffset || 0}
                side={props.side || "bottom"}
                sideOffset={props.sideOffset || 6}
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
                        borderColor: "neutral/20",
                        minWidth: "var(--radix-dropdown-menu-trigger-width)",
                    }),
                    props.className,
                )}
            >
                {props.children}
            </DropdownMenuContent>
        </DropdownMenuPortal>
    )
}
