import { css } from "@arrhes/ui/utilities/cn.js"
import type { ReactNode } from "react"

export function TreeSection({ title, children }: { title?: string; children: ReactNode }) {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.125rem",
            })}
        >
            {title && (
                <div
                    className={css({
                        padding: "0.5rem 0.75rem",
                        fontSize: "xs",
                        fontWeight: "bold",
                        color: "neutral/40",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    })}
                >
                    {title}
                </div>
            )}
            {children}
        </div>
    )
}
