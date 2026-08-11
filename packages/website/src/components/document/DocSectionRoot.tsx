import { css } from "@comptasse/ui/utilities/cn.js"
import type { ReactNode } from "react"

export function DocSectionRoot(props: { depth?: number; children: ReactNode }) {
    const depth = props.depth ?? 0

    return (
        <section
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                mt: depth === 0 ? "8" : "4",
            })}
        >
            {props.children}
        </section>
    )
}
