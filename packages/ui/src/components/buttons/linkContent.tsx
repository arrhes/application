import { css, cx } from "../../utilities/cn.ts"

export type LinkContentProps = {
    disabled?: boolean
    children?: string
    className?: string
}

export function LinkContent(props: LinkContentProps) {
    return (
        <span
            aria-disabled={props.disabled}
            className={cx(
                css({
                    color: "primary",
                    textDecoration: "underline",
                    cursor: "pointer",
                    _hover: { textDecoration: "none" },
                    _disabled: { opacity: 0.3, cursor: "not-allowed" },
                }),
                props.className,
            )}
        >
            {props.children}
        </span>
    )
}
