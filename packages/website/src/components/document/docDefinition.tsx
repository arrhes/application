import { css } from "@arrhes/ui/utilities/cn.js";
import { IconBookmark } from "@tabler/icons-react";
import type { ReactNode } from "react";

export function DocDefinition(props: { term: string; definition: ReactNode }) {
    return (
        <div
            className={css({
                padding: "1rem",
                borderRadius: "lg",
                backgroundColor: "white",
                border: "1px solid",
                borderColor: "neutral/15",
                borderLeft: "3px solid",
                borderLeftColor: "neutral/15",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                <IconBookmark
                    size={12}
                    className={css({
                        stroke: "neutral/50",
                        flexShrink: 0,
                    })}
                />
                <span
                    className={css({
                        fontSize: "xs",
                        fontWeight: "medium",
                        color: "neutral/50",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
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
                <dt
                    className={css({
                        fontWeight: "semibold",
                        color: "neutral",
                        fontSize: "sm",
                    })}
                >
                    {props.term}
                </dt>
                <dd
                    className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "1.6",
                    })}
                >
                    {props.definition}
                </dd>
            </div>
        </div>
    )
}
