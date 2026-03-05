import { css, cx } from "@arrhes/ui/utilities/cn.js"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import type { ComponentProps } from "react"

type PopoverContent = ComponentProps<typeof PopoverPrimitive.Content>

export function PopoverContent(props: PopoverContent) {
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                {...props}
                align={props.align || "start"}
                alignOffset={props.alignOffset || 0}
                side={props.side || "bottom"}
                sideOffset={props.sideOffset || 4}
                className={cx(
                    css({
                        zIndex: "10",
                        padding: "0.5rem",
                        backgroundColor: "white",
                        borderRadius: "lg",
                        boxShadow: "md",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        gap: "0.5rem",
                        minWidth: "var(--radix-popover-trigger-width)",
                        // maxWidth: "var(--radix-popover-trigger-width)",
                        border: "1px solid",
                        borderColor: "neutral/10",
                    }),
                    props.className,
                )}
            />
        </PopoverPrimitive.Portal>
    )
}
