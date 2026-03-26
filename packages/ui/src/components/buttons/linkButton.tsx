import { css, cx } from "../../utilities/cn.js"
import { Link } from "@tanstack/react-router"
import type { MouseEventHandler, ReactNode } from "react"

/**
 * LinkButton - a neutral container wrapping TanStack Router's Link
 * Use with composition pattern (children)
 *
 * @example
 * <LinkButton to="/dashboard">
 *   <ButtonPlainContent text="Go to Dashboard" leftIcon={<IconHome />} />
 * </LinkButton>
 */
export function LinkButton(props: {
    to: any
    params?: any
    hash?: string
    target?: string
    rel?: string
    title?: string
    disabled?: boolean
    className?: string
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
    children: ReactNode
}) {
    return (
        <Link
            to={props.to}
            params={props.params}
            hash={props.hash}
            target={props.target}
            rel={props.rel}
            className={cx(
                css({
                    width: "fit-content",
                    maxWidth: "100%",
                    _disabled: { cursor: "not-allowed", pointerEvents: "none" },
                }),
                props.className,
            )}
            aria-disabled={props.disabled}
            title={props.title}
            onClick={props.onClick}
        >
            {props.children}
        </Link>
    )
}
