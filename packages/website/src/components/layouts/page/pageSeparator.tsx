import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"

type PageSeparator = ComponentProps<"div">

export function PageSeparator(props: PageSeparator) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    height: "1px",
                    borderBottom: "1px solid",
                    borderColor: "neutral/10",
                }),
                props.className,
            )}
        />
    )
}
