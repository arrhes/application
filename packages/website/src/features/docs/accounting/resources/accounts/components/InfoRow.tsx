import { css } from "@comptasse/ui/utilities/cn.js"

export function InfoRow(props: { label: string; value: string }) {
    return (
        <div
            className={css({
                display: "flex",
                alignItems: "baseline",
                gap: "0.5rem",
            })}
        >
            <span
                className={css({
                    fontSize: "xs",
                    fontWeight: "medium",
                    color: "neutral/40",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    minWidth: "4rem",
                })}
            >
                {props.label}
            </span>
            <span
                className={css({
                    fontSize: "sm",
                    color: "neutral",
                    fontWeight: "medium",
                })}
            >
                {props.value}
            </span>
        </div>
    )
}
