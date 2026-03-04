import { css } from "@arrhes/ui/utilities/cn.js"
import type { ValidRoutes } from "../../routes/applicationRouter.js"
import { LinkButton } from "../linkButton.js"

export function DocIndexLink(props: { to: ValidRoutes; label: string }) {
    return (
        <LinkButton
            to={props.to}
            className={css({
                width: "100%",
                gap: "0.5rem",
                py: "1.5",
                fontSize: "sm",
                color: "neutral/60",
                _hover: { color: "primary" },
                transition: "colors",
            })}
        >
            <span
                className={css({
                    width: "1.5",
                    height: "1.5",
                    borderRadius: "100%",
                    backgroundColor: "currentColor",
                    opacity: 0.5,
                })}
            />
            {props.label}
        </LinkButton>
    )
}
