import { css } from "@arrhes/ui/utilities/cn.js"
import type { ReactNode } from "react"
import type { ValidRoutes } from "../../routes/applicationRouter.js"
import { LinkButton } from "../linkButton.js"

export type DocLinkCardColor = "information" | "success" | "primary" | "warning"

export function DocLinkCard(props: {
    icon: ReactNode
    iconColor?: DocLinkCardColor
    title: string
    description: string
    to: ValidRoutes
}) {
    const colorStyles: Record<DocLinkCardColor, { bg: string; color: string }> = {
        information: { bg: "information/10", color: "information" },
        success: { bg: "success/10", color: "success" },
        primary: { bg: "primary/10", color: "primary" },
        warning: { bg: "warning/10", color: "warning" },
    }
    const style = colorStyles[props.iconColor ?? "primary"]

    return (
        <LinkButton
            to={props.to}
            className={css({
                width: "100%",
                flexDirection: "column",
                gap: "0.75rem",
                padding: "1.5rem",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "neutral/10",
                backgroundColor: "white",
                transition: "all 0.15s",
                _hover: {
                    borderColor: "neutral/20",
                    boxShadow: "sm",
                },
            })}
        >
            <div
                className={css({
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "md",
                    backgroundColor: style.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: style.color,
                    "& svg": {
                        width: "1.25rem",
                        height: "1.25rem",
                    },
                })}
            >
                {props.icon}
            </div>
            <h3
                className={css({
                    fontSize: "md",
                    fontWeight: "semibold",
                    color: "neutral",
                })}
            >
                {props.title}
            </h3>
            <p
                className={css({
                    fontSize: "sm",
                    color: "neutral/60",
                    lineHeight: "relaxed",
                })}
            >
                {props.description}
            </p>
        </LinkButton>
    )
}
