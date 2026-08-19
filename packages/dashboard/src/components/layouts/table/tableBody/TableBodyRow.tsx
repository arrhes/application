import { cn, css } from "@comptasse/ui/utilities/cn.js"
import type { ComponentProps, ReactElement } from "react"

export function TableBodyRow(props: {
    children: ReactElement | ReactElement[]
    className?: ComponentProps<"tr">["className"]
}) {
    return (
        <tr
            className={cn(
                css({
                    width: "100%",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/5",
                    _last: {
                        borderBottom: "0",
                    },
                }),
                props.className,
            )}
        >
            {props.children}
        </tr>
    )
}
