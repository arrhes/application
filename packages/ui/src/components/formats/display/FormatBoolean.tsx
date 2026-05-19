import type { ComponentProps } from "react"
import { Chip } from "../../layouts/Chip.js"
import { FormatBase } from "../FormatBase.js"

export function FormatBoolean(props: {
    boolean?: boolean | null
    text?: string
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <FormatBase className={props.className}>
            <Chip
                text={props.text ?? (!props.boolean ? "Non" : "Oui")}
                color={!props.boolean ? "error" : "success"}
            />
        </FormatBase>
    )
}
