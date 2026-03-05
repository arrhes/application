import { css } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"
import { FormatBase } from "./formatBase.js"

export function FormatError(props: { text: string; className?: ComponentProps<"div">["className"] }) {
    return (
        <FormatBase className={props.className}>
            <span
                className={css({
                    display: "inline-flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "sm",
                    fontWeight: "semibold",
                    color: "error/75",
                    whiteSpace: "nowrap",
                    overflow: "auto",
                    textOverflow: "ellipsis",
                })}
            >
                {props.text}
            </span>
        </FormatBase>
    )
}
