import { css } from "@comptasse/ui/css"
import { IconInfoCircle } from "@tabler/icons-react"

export function DocExample(props: { title?: string; children: React.ReactNode }) {
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
                <IconInfoCircle
                    className={css({
                        width: "0.875rem",
                        height: "0.875rem",
                        flexShrink: 0,
                        stroke: "neutral/50",
                    })}
                />
                <span
                    className={css({
                        fontSize: "xs",
                        fontWeight: "medium",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "neutral/50",
                    })}
                >
                    Exemple{props.title !== undefined && ` - ${props.title}`}
                </span>
            </div>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "1rem",
                })}
            >
                {props.children}
            </div>
        </div>
    )
}
