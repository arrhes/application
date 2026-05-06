import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { Icon, IconProps } from "@tabler/icons-react"
import { type ComponentProps, cloneElement, type ReactElement, type ReactNode } from "react"

export function EmptyState(props: {
    icon: ReactElement<IconProps & React.RefAttributes<Icon>>
    title: string
    subtitle?: string
    action?: ReactNode
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "2rem",
                }),
                props.className,
            )}
        >
            <div className={css({ color: "neutral", opacity: "0.2" })}>
                {cloneElement(props.icon, {
                    size: 48,
                })}
            </div>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.25rem",
                })}
            >
                <span
                    className={css({
                        fontSize: "sm",
                        fontWeight: "medium",
                        color: "neutral/60",
                    })}
                >
                    {props.title}
                </span>
                {props.subtitle && (
                    <span
                        className={css({
                            fontSize: "xs",
                            color: "neutral/40",
                        })}
                    >
                        {props.subtitle}
                    </span>
                )}
            </div>
            {props.action && props.action}
        </div>
    )
}
