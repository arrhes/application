import { css } from "@arrhes/ui/utilities/cn.js"
import type { ValidParams, ValidRoutes } from "../../routes/applicationRouter.js"
import { LinkButton } from "../LinkButton.js"

export function DocLink(props: { to: ValidRoutes; params?: ValidParams; hash?: string; children: React.ReactNode }) {
    return (
        <LinkButton
            to={props.to}
            params={props.params}
            hash={props.hash}
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
