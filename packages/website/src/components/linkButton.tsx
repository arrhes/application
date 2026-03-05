import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { Link } from "@tanstack/react-router"
import type { ComponentProps, MouseEventHandler, ReactNode } from "react"
import type { ValidParams, ValidRoutes } from "../routes/applicationRouter.js"

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
    to: ValidRoutes
    params?: ValidParams
    target?: ComponentProps<typeof Link>["target"]
    rel?: ComponentProps<typeof Link>["rel"]
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
            target={props.target}
            rel={props.rel}
            className={cx(
                css({
                    // display: "flex",
                    // justifyContent: "flex-start",
                    // alignItems: "center",
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
