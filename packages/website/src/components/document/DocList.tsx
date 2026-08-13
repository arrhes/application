import { css } from "@comptasse/ui/utilities/cn.js"
import type { ReactNode } from "react"

export type DocListVariant = "check" | "bullet" | "ordered" | "hyphen" | "none"
export type DocListSize = "sm" | "xs"

export function DocList(props: { items: ReactNode[]; variant?: DocListVariant; size?: DocListSize; ids?: string[] }) {
    const variant = props.variant ?? "check"
    const size = props.size ?? "sm"

    return (
        <ul
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
            })}
        >
            {props.items.map((item, index) => (
                <li
                    key={typeof item === "string" ? item : `${variant}-${index}`}
                    id={props.ids?.[index]}
                    className={css({
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.25rem",
                        color: "neutral",
                        fontSize: size,
                        lineHeight: "1.6",
                    })}
                >
                    {variant === "check" ? (
                        <span
                            className={css({
                                color: "neutral",
                            })}
                        >
                            ✓
                        </span>
                    ) : variant === "bullet" ? (
                        <span
                            className={css({
                                color: "neutral",
                            })}
                        >
                            •
                        </span>
                    ) : variant === "ordered" ? (
                        <span
                            className={css({
                                color: "neutral",
                            })}
                        >
                            {index + 1}.
                        </span>
                    ) : variant === "hyphen" ? (
                        <span
                            className={css({
                                color: "neutral",
                            })}
                        >
                            –
                        </span>
                    ) : null}
                    <span
                        className={css({
                            color: "neutral",
                        })}
                    >
                        {item}
                    </span>
                </li>
            ))}
        </ul>
    )
}
