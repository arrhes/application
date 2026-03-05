import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactNode } from "react"

export function PageHeader(props: { children?: ReactNode; className?: ComponentProps<"div">["className"] }) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    maxWidth: "xl",
                    height: "fit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
