import { css } from "@comptasse/ui/utilities/cn.js"
import type { ReactNode } from "react"

export function DocList(props: { items: ReactNode[]; variant?: "bullet" | "check" }) {
    const variant = props.variant ?? "check"

    return (
        <ul
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
            })}
        >
            {props.items.map((item) => (
                <li
                    key={typeof item === "string" ? item : `${variant}-${String(item)}`}
                    className={css({
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.25rem",
                        color: "neutral/70",
                        fontSize: "sm",
                        lineHeight: "1.6",
                    })}
                >
                    {variant === "check" ? (
                        <span
                            className={css({
                                color: "neutral/50",
                            })}
                        >
                            ✓
                        </span>
                    ) : (
                        <span
                            className={css({
                                color: "neutral/50",
                            })}
                        >
                            •
                        </span>
                    )}
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}
