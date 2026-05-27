import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function TableRoot(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<"table">["className"]
}) {
    return (
        <table
            className={cx(
                css({
                    width: "100%",
                    height: "fit",
                    borderCollapse: "collapse",
                }),
                props.className,
            )}
            children={props.children}
        />
    )
}
