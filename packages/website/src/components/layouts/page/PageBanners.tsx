import { cn, css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactNode } from "react"

export function PageBanners(props: { children: ReactNode; className?: ComponentProps<"div">["className"] }) {
    return (
        <div
            className={cn(
                css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
