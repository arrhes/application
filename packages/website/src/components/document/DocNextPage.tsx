import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import type { ValidParams, ValidRoutes } from "../../routes/applicationRouter.js"
import { LinkButton } from "../LinkButton.js"

export function DocNextPage(props: { to: ValidRoutes; params?: ValidParams; label: string; description?: string }) {
    return (
        <div
            className={css({
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "0.5rem",
            })}
        >
            <span
                className={css({
                    fontSize: "xs",
                    fontWeight: "medium",
                    color: "neutral/40",
                    textTransform: "uppercase",
                    letterSpacing: "wider",
                })}
            >
                Page suivante
            </span>
            {props.description && (
                <p
                    className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "1.6",
                    })}
                >
                    {props.description}
                </p>
            )}
            <LinkButton
                to={props.to}
                params={props.params}
            >
                <ButtonOutlineContent
                    text={props.label}
                    rightIcon={<IconChevronRight />}
                />
            </LinkButton>
        </div>
    )
}
