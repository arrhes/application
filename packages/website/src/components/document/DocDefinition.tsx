import { css } from "@comptasse/ui/utilities/cn.js"
import { IconBookmark } from "@tabler/icons-react"
import type { ReactNode } from "react"

export function DocDefinition(props: { term?: string; children: ReactNode }) {
    return (
        <div
            className={css({
                padding: "1.25rem",
                borderRadius: "lg",
                border: "1px solid",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                backgroundColor: "white",
                borderColor: "neutral/15",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                })}
            >
                <span
                    className={css({
                        width: "0.875rem",
                        height: "0.875rem",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    })}
                >
                    <IconBookmark
                        className={css({
                            width: "100%",
                            height: "100%",
                            stroke: "neutral/50",
                        })}
                    />
                </span>
                <span
                    className={css({
                        fontSize: "xs",
                        fontWeight: "medium",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "neutral/50",
                    })}
                >
                    Définition
                </span>
            </div>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "0.5rem",
                })}
            >
                {props.term && (
                    <dt
                        className={css({
                            fontWeight: "semibold",
                            color: "neutral",
                            fontSize: "md",
                        })}
                    >
                        {props.term}
                    </dt>
                )}
                <dd
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "0.5rem",
                    })}
                >
                    {props.children}
                </dd>
            </div>
        </div>
    )
}
