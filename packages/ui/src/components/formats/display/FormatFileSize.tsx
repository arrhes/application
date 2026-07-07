import type { Styles } from "../../../../styled-system/css/css"
import { css } from "../../../utilities/cn.js"
import { FormatBase } from "../FormatBase.js"
import { FormatNull } from "../FormatNull.js"
import { formatFileSize } from "../formatFileSize.js"

export function FormatFileSize(props: { size?: number | null; className?: Styles }) {
    if (props.size === undefined || props.size === null) return <FormatNull />
    return (
        <FormatBase className={props.className}>
            <span
                className={css({
                    width: "fit",
                    maxWidth: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontSize: "sm",
                    fontFamily: "mono",
                    wordBreak: "break-word",
                })}
            >
                {formatFileSize(props.size)}
            </span>
        </FormatBase>
    )
}
