import type { ComponentProps } from "react"
import { css } from "../../utilities/cn.ts"

export function Kbd(props: { children: ComponentProps<"kbd">["children"] }) {
    return (
        <kbd
            className={css({
                display: "inline-flex",
                alignItems: "center",
                px: "0.375rem",
                py: "0.125rem",
                borderRadius: "0.25rem",
                border: "1px solid",
                borderColor: "neutral/50",
                backgroundColor: "neutral/5",
                fontSize: "0.75rem",
                fontFamily: "mono",
                color: "neutral/600",
            })}
        >
            {props.children}
        </kbd>
    )
}
