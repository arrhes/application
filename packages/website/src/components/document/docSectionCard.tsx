import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import type { ReactNode } from "react"
import type { ValidRoutes } from "../../routes/applicationRouter.js"
import { LinkButton } from "../linkButton.js"

export type DocSectionCardColor = "information" | "success" | "primary" | "warning"

export function DocSectionCard(props: {
    icon: ReactNode
    iconColor?: DocSectionCardColor
    title: string
    description: string
    links: { to: ValidRoutes; label: string }[]
    ctaTo: ValidRoutes
    ctaLabel: string
}) {
    const colorStyles: Record<DocSectionCardColor, { bg: string; color: string }> = {
        information: { bg: "information/10", color: "information" },
        success: { bg: "success/10", color: "success" },
        primary: { bg: "primary/10", color: "primary" },
        warning: { bg: "warning/10", color: "warning" },
    }
    const style = colorStyles[props.iconColor ?? "primary"]

    return (
        <div
            className={css({
                flex: "1",
                padding: "1.5rem",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "neutral/10",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            {/* Icon */}
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

            {/* Title */}
            <h2
                className={css({
                    fontSize: "md",
                    fontWeight: "semibold",
                    color: "neutral",
                })}
            >
                {props.title}
            </h2>

            {/* Description */}
            <p
                className={css({
                    fontSize: "sm",
                    color: "neutral/60",
                    lineHeight: "relaxed",
                })}
            >
                {props.description}
            </p>

            {/* Links */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    flex: "1",
                })}
            >
                {props.links.map((link) => (
                    <LinkButton
                        key={link.to}
                        to={link.to}
                        className={css({
                            width: "100%",
                            gap: "0.5rem",
                            paddingY: "0.5rem",
                            paddingX: "0.5rem",
                            borderRadius: "md",
                            fontSize: "sm",
                            color: "neutral/70",
                            _hover: {
                                backgroundColor: "neutral/5",
                                color: "neutral",
                            },
                            transition: "all 0.15s",
                        })}
                    >
                        <span
                            className={css({
                                width: "0.375rem",
                                height: "0.375rem",
                                borderRadius: "lg",
                                backgroundColor: "neutral/30",
                            })}
                        />
                        {link.label}
                    </LinkButton>
                ))}
            </div>

            {/* CTA */}
            <LinkButton to={props.ctaTo}>
                <ButtonOutlineContent text={props.ctaLabel} rightIcon={<IconChevronRight />} />
            </LinkButton>
        </div>
    )
}
