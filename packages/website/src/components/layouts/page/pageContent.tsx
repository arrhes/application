import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactNode } from "react"

export function PageContent(props: { className?: ComponentProps<"div">["className"]; children: ReactNode }) {
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
                    gap: "1rem",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
