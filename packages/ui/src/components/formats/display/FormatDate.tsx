import type { Styles } from "../../../../styled-system/css/css"
import { css } from "../../../utilities/cn.js"
import { FormatNull } from "../FormatNull.js"
import { FormatText } from "../FormatText.js"
import { formatDate } from "../formatDate.js"

export function FormatDate(props: { date?: string | Date | undefined | null; className?: Styles }) {
    if (!props.date) return <FormatNull />
    if (String(new Date(props.date)) === "Invalid Date") return <FormatNull />
    return (
        <FormatText
            className={css.raw(
                {
                    fontFamily: "mono",
                },
                props.className,
            )}
        >
            {formatDate(props.date)}
        </FormatText>
    )
}
