import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function TableHeaderRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<"thead">["className"]
}) {
    return (
        <thead
            className={cx(
                css({
                    width: "100%",
                    borderBottom: "1px solid",
                    borderColor: "neutral/10",
                }),
                props.className,
            )}
            children={props.children}
        />
    )
}
