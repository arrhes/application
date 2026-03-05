import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCheck } from "@tabler/icons-react"
import type { ReactNode } from "react"

export function FeatureCard(props: { icon: ReactNode; title: string; description: string; features: string[] }) {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                padding: "2rem",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "neutral/10",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "start",
                    gap: "2rem",
                })}
            >
                <div
                    className={css({
                        // marginX: "auto",
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "md",
                        backgroundColor: "background",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "primary",
                        "& svg": {
                            width: "1.25rem",
                            height: "1.25rem",
                        },
                    })}
                >
                    {props.icon}
                </div>
                <h3
                    className={css({
                        fontSize: "lg",
                        fontWeight: "semibold",
                        color: "neutral",
                    })}
                >
                    {props.title}
                </h3>
            </div>
            <p
                className={css({
                    fontSize: "sm",
                    color: "neutral/60",
                    lineHeight: "relaxed",
                })}
            >
                {props.description}
            </p>
            <ul
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                })}
            >
                {props.features.map((feature) => (
                    <li
                        key={feature}
                        className={css({
                            display: "inline-flex",
                            alignItems: "start",
                            gap: "0.5rem",
                            fontSize: "sm",
                            color: "neutral/70",
                        })}
                    >
                        <IconCheck
                            className={css({
                                marginTop: "0.125rem",
                                flexShrink: 0,
                                width: "1rem",
                                height: "1rem",
                                color: "success",
                            })}
                        />
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    )
}
