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
                    color: "primary",
                    textDecoration: "underline",
                    cursor: "pointer",
                    _hover: {
                        textDecoration: "none",
                    },
                    _disabled: {
                        opacity: 0.3,
                        cursor: "not-allowed",
                    },
                },
                props.className,
            )}
        >
            {props.children}
        </span>
    )
}
