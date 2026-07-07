import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.js"

export function Separator(props: { orientation?: "horizontal" | "vertical"; className?: Styles }) {
    const orientation = props.orientation ?? "horizontal"

    return (
        <hr
            aria-hidden="true"
            tabIndex={-1}
            aria-orientation={orientation}
            className={css(
                {
                    backgroundColor: "neutral/10",
                    flexShrink: 0,
                    border: 0,
                    margin: 0,
                },
                orientation === "horizontal"
                    ? {
                          width: "100%",
                          height: "1px",
                      }
                    : {
                          width: "1px",
                          height: "100%",
                      },
                props.className,
            )}
        />
    )
}
