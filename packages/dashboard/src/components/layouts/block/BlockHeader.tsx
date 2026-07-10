import { css } from "@arrhes/ui/utilities/cn.js"

export function BlockHeader(props: { title: string; description?: string; variant?: "default" | "danger" }) {
    const isDanger = props.variant === "danger"

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid",
                borderBottomColor: isDanger ? "error/10" : "neutral/10",
            })}
        >
            <span
                className={css({
                    fontSize: "md",
                    fontWeight: "bold",
                    color: isDanger ? "error" : undefined,
                })}
            >
                {props.title}
            </span>
            {props.description !== undefined ? (
                <span
                    className={css({
                        fontSize: "sm",
                        color: "neutral/50",
                    })}
                >
                    {props.description}
                </span>
            ) : null}
        </div>
    )
}
