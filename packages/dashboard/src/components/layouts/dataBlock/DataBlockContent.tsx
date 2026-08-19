import { cn, css } from "@comptasse/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function DataBlockContent(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cn(
                css({
                    flexShrink: "0",
                    width: "100%",
                    height: "fit",
                    display: "flex",
                    flexDirection: "column",
                    // gridTemplateColumns: "max-content auto",
                    // columnGap: "1rem",
                    padding: "0",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    borderRadius: "lg",
                    overflow: "hidden",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
