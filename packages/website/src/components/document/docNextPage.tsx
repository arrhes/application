import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import type { ValidRoutes } from "../../routes/applicationRouter.js"
import { LinkButton } from "../linkButton.js"

export function DocNextPage(props: { to: ValidRoutes; label: string }) {
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
            <LinkButton to={props.to}>
                <ButtonOutlineContent text={props.label} rightIcon={<IconChevronRight />} />
            </LinkButton>
        </div>
    )
}
