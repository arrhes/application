import { Link } from "@tanstack/react-router"
import type { MouseEventHandler, ReactNode } from "react"
import type { Styles } from "../../../styled-system/css/css.js"
import { css } from "../../utilities/cn.js"

/**
 * LinkButton - a neutral container wrapping TanStack Router's Link
 * Use with composition pattern (children)
 *
 * @example
 * <LinkButton to="/dashboard">
 *   <ButtonPlainContent text="Go to Dashboard" leftIcon={<IconHome />} />
 * </LinkButton>
 */
type LinkButtonProps = {
    to: string
    params?: Record<string, string | null | undefined>
    hash?: string
    target?: string
    rel?: string
    title?: string
    disabled?: boolean
    className?: Styles
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
    children: ReactNode
}

export function LinkButton(props: LinkButtonProps) {
    return (
        <Link
            to={props.to as never}
            params={props.params as never}
            hash={props.hash}
            target={props.target}
            rel={props.rel}
            className={css(
                {
                    width: "fit-content",
                    maxWidth: "100%",
                    _disabled: {
                        cursor: "not-allowed",
                        pointerEvents: "none",
                    },
                },
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
