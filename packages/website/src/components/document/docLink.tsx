import { css } from "@arrhes/ui/utilities/cn.js"
import type { ValidRoutes } from "../../routes/applicationRouter.js"
import { LinkButton } from "../linkButton.js"

export function DocLink(props: { to: ValidRoutes; children: React.ReactNode }) {
    return (
        <LinkButton
            to={props.to}
            className={css({
                fontSize: "sm",
                color: "primary",
                fontWeight: "medium",
                textDecoration: "underline",
                textDecorationColor: "primary/30",
                textUnderlineOffset: "2px",
                _hover: {
                    textDecorationColor: "primary",
                },
                transition: "all 0.15s",
            })}
        >
            {props.children}
        </LinkButton>
    )
}
