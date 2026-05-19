import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function SectionRoot(props: {
    children: null | ReactElement | (null | ReactElement)[]
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cx(
                css({
                    flexGrow: "1",
                    minWidth: "0",
                    width: "100%",
                    maxWidth: "100%",
                    height: "fit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "8",
                }),
                props.className,
            )}
            children={props.children}
        />
    )
}
