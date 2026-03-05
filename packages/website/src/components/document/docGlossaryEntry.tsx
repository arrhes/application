import { css } from "@arrhes/ui/utilities/cn.js"
import type { ReactNode } from "react"

export function DocGlossaryEntry(props: { term: string; definition: ReactNode }) {
    return (
        <div
            className={css({
                paddingBlock: "0.625rem",
                paddingInline: "0.75rem",
                borderBottom: "1px solid",
                borderColor: "neutral/6",
            })}
        >
            <dt
                className={css({
                    fontWeight: "semibold",
                    color: "neutral",
                    fontSize: "sm",
                    marginBottom: "0.125rem",
                })}
            >
                {props.term}
            </dt>
            <dd
                className={css({
                    fontSize: "sm",
                    color: "neutral/55",
                    lineHeight: "1.6",
                })}
            >
                {props.definition}
            </dd>
        </div>
    )
}
