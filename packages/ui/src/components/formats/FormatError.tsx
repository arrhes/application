import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.js"
import { FormatBase } from "./FormatBase.js"

export function FormatError(props: { text: string; className?: Styles }) {
    return (
        <FormatBase className={props.className}>
            <span
                className={css({
                    display: "inline-flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "sm",
                    fontWeight: "semibold",
                    color: "error/75",
                    whiteSpace: "nowrap",
                    overflow: "auto",
                    textOverflow: "ellipsis",
                })}
            >
                {props.text}
            </span>
        </FormatBase>
    )
}
