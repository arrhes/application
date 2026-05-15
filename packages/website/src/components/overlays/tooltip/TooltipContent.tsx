import { css, cx } from "@arrhes/ui/utilities/cn.js"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import type { ComponentProps } from "react"

export function TooltipContent(props: ComponentProps<typeof TooltipPrimitive.Content>) {
    return (
        <TooltipPrimitive.Content
            ref={props.ref}
            sideOffset={props.sideOffset}
            className={cx(
                css({
                    zIndex: "50",
                    overflowY: "auto",
                    maxWidth: "xs",
                    borderRadius: "md",
                    backgroundColor: "neutral",
                    padding: "0.5rem",
                    fontSize: "xs",
                    "&[data-state=open]": {
                        animation: "fadeIn 0.2s ease-out, zoomIn 0.2s ease-out",
                    },
                    "&[data-state=closed]": {
                        animation: "fadeOut 0.2s ease-in, zoomOut 0.2s ease-in",
                    },
                }),
                props.className,
            )}
            {...props}
        >
            <span
                className={css({
                    color: "white",
                })}
            >
                {props.children}
            </span>
        </TooltipPrimitive.Content>
    )
}
