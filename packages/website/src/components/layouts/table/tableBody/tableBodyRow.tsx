import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function TableBodyRow(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<"tr">["className"]
}) {
    return (
        <tr
            className={cx(
                css({
                    width: "100%",
                    borderBottom: "1px solid",
                    borderColor: "neutral/5",
                    _last: { borderBottom: "0" },
                }),
                props.className,
            )}
            children={props.children}
        />
    )
}
