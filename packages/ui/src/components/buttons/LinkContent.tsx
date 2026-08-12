import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.ts"

export type LinkContentProps = {
    disabled?: boolean
    children?: string
    className?: Styles
}

export function LinkContent(props: LinkContentProps) {
    return (
        <span
            aria-disabled={props.disabled}
            className={css(
                {
                    cursor: "pointer",
                    fontSize: "sm",
                    color: "primary",
                    fontWeight: "medium",
                    textDecoration: "underline",
                    textDecorationColor: "primary/25",
                    textUnderlineOffset: "2px",
                    _hover: {
                        textDecorationColor: "primary",
                    },
                    _disabled: {
                        opacity: 0.3,
                        cursor: "not-allowed",
                    },
                    transition: "all 0.15s",
                },
                props.className,
            )}
        >
            {props.children}
        </span>
    )
}
