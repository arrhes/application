import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { ContextMenuPortal, ContextMenuContent as RadixContextMenuContent } from "@radix-ui/react-context-menu"
import type { ComponentPropsWithRef } from "react"

export function ContextMenuContent(props: ComponentPropsWithRef<typeof RadixContextMenuContent>) {
    return (
        <ContextMenuPortal>
            <RadixContextMenuContent
                {...props}
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
                    props.className,
                )}
            >
                {props.children}
            </RadixContextMenuContent>
        </ContextMenuPortal>
    )
}
