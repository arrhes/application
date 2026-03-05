import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function PageRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    flexShrink: "0",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "2rem",
                    backgroundColor: "white",
                    padding: "1rem",
                }),
                props.className,
            )}
            children={props.children}
        />
    )
}
