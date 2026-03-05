import { css } from "@arrhes/ui/utilities/cn.js"
import { IconInfoCircle } from "@tabler/icons-react"

export function DocExample(props: { title?: string; children: React.ReactNode }) {
    return (
        <div
            className={css({
                padding: "1.25rem",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "information/10",
                borderLeft: "3px solid",
                borderLeftColor: "information/10",
                backgroundColor: "information/5",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "1rem",
            })}
        >
            {props.title && (
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <IconInfoCircle
                        className={css({
                            flexShrink: "0",
                            width: "1rem",
                            height: "1rem",
                            color: "information",
                        })}
                    />
                    <span
                        className={css({
                            fontSize: "sm",
                            fontWeight: "semibold",
                            color: "information",
                        })}
                    >
                        {props.title}
                    </span>
                </div>
            )}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "0.5rem",
                })}
            >
                {props.children}
            </div>
        </div>
    )
}
