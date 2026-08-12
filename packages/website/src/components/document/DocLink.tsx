import { type ButtonContentProps, ButtonOutlineContent, LinkContent } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import type { ComponentProps } from "react"
import type { ValidParams, ValidRoutes } from "../../routes/applicationRouter.js"
import { LinkButton } from "../LinkButton.js"

type DocLinkLocalProps = {
    to: ValidRoutes
    params?: ValidParams
    hash?: string
    href?: undefined
}

type DocLinkExternalProps = {
    href: string
    target?: string
    rel?: string
    to?: undefined
}

type DocLinkCommonProps = {
    className?: ComponentProps<typeof LinkButton>["className"]
    title?: string
    children?: string
    buttonProps?: ButtonContentProps
}

export function DocLink(props: DocLinkCommonProps & (DocLinkLocalProps | DocLinkExternalProps)) {
    const content = props.buttonProps ? (
        <ButtonOutlineContent {...props.buttonProps} />
    ) : (
        <LinkContent>{props.children}</LinkContent>
    )

    if (props.href !== undefined) {
        return (
            <a
                href={props.href}
                target={props.target}
                rel={props.rel}
                title={props.title}
                className={css(
                    {
                        width: "fit-content",
                        maxWidth: "100%",
                        display: "inline-block",
                    },
                    props.className,
                )}
            >
                {content}
            </a>
        )
    }

    return (
        <LinkButton
            to={props.to}
            params={props.params}
            hash={props.hash}
            title={props.title}
            className={props.className}
        >
            {content}
        </LinkButton>
    )
}
