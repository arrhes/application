import { cn, css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function PageRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cn(
                css({
                    width: "100%",
                    flexShrink: "0",
                    flex: "1",
                    minHeight: "0",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "2rem",
                    backgroundColor: "white",
                    paddingY: "1.5rem",
                    paddingX: "1.5rem",
                }),
                props.className,
            )}
            children={props.children}
        />
    )
}
