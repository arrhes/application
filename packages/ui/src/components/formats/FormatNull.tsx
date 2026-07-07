import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.js"

export function FormatNull(props: { text?: string; className?: Styles }) {
    return (
        <span
            className={css(
                {
                    display: "inline-flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "sm",
                    fontStyle: "italic",
                    color: "neutral/50",
                    whiteSpace: "nowrap",
                    overflow: "auto",
                    textOverflow: "ellipsis",
                },
                props.className,
            )}
        >
            {props.text ?? "/"}
        </span>
    )
}
