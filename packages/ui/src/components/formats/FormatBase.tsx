import type { ReactNode } from "react"
import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.js"

type FormatBase = {
    children: ReactNode
    className?: Styles
}

export function FormatBase(props: FormatBase) {
    return (
        <div
            className={css(
                {
                    width: "fit",
                    maxWidth: "100%",
                    overflow: "auto",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                },
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
