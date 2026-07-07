import type { ReactNode } from "react"
import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.js"
import { FormatNull } from "./FormatNull.js"

export function FormatText(props: { wrap?: boolean; className?: Styles; children?: ReactNode }) {
    if (!props.children) return <FormatNull />
    return (
        <span
            className={css(
                {
                    fontSize: "sm",
                    wordBreak: "break-word",
                    overflowX: "hidden",
                    textOverflow: "ellipsis",
                },
                !props.wrap
                    ? {
                          whiteSpace: "nowrap",
                      }
                    : undefined,
                props.className,
            )}
        >
            {props.children}
        </span>
    )
}
