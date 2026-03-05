import { css } from "@arrhes/ui/utilities/cn.js"
import type { JSX } from "react"

export function DrawerBody(props: { children: JSX.Element }) {
    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "2rem",
            })}
        >
            {props.children}
        </div>
    )
}
