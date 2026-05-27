import type { ReactNode } from "react"
import { css } from "../../utilities/cn.js"

type FormGroup = {
    title: string
    children: ReactNode
}

export function FormGroup(props: FormGroup) {
    return (
        <fieldset
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
                gap: "1rem",
                border: "none",
                padding: "0",
                margin: "0",
            })}
        >
            <legend
                className={css({
                    fontSize: "sm",
                    fontWeight: "medium",
                    color: "neutral/50",
                    paddingBottom: "0.25rem",
                })}
            >
                {props.title}
            </legend>
            {props.children}
        </fieldset>
    )
}
