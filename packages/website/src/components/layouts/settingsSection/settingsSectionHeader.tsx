import { css } from "@arrhes/ui/utilities/cn.js"

export function SettingsSectionHeader(props: { title: string; description?: string; variant?: "default" | "danger" }) {
    const isDanger = props.variant === "danger"

    return (
        <div
            className={css({
                flex: "1",
                minWidth: "0",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid",
                borderBottomColor: isDanger ? "error/5" : "neutral/5",
            })}
        >
            <span
                className={css({
                    fontSize: "lg",
                    fontWeight: "semibold",
                    color: isDanger ? "error" : undefined,
                })}
            >
                {props.title}
            </span>
            {props.description !== undefined ? (
                <span className={css({ fontSize: "sm", color: "neutral/50" })}>{props.description}</span>
            ) : null}
        </div>
    )
}
