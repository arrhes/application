import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { ComponentProps } from "react"

export type ChipColors = keyof typeof chipColors

const chipColors = {
    neutral: {
        backgroundColor: css({ backgroundColor: "neutral/5" }),
        border: css({ borderColor: "neutral/10" }),
        text: css({ color: "neutral" }),
    },
    information: {
        backgroundColor: css({ backgroundColor: "information/5" }),
        border: css({ borderColor: "information/10" }),
        text: css({ color: "information" }),
    },
    error: {
        backgroundColor: css({ backgroundColor: "error/5" }),
        border: css({ borderColor: "error/10" }),
        text: css({ color: "error" }),
    },
    warning: {
        backgroundColor: css({ backgroundColor: "warning/5" }),
        border: css({ borderColor: "warning/10" }),
        text: css({ color: "warning" }),
    },
    success: {
        backgroundColor: css({ backgroundColor: "success/5" }),
        border: css({ borderColor: "success/10" }),
        text: css({ color: "success" }),
    },
}

export function Chip(props: {
    text: string | null | undefined
    color?: keyof typeof chipColors
    className?: ComponentProps<"div">["className"]
}) {
    if (props.text === null) {
        return null
    }
    if (props.text === undefined) {
        return null
    }

    return (
        <div
            className={cx(
                css({
                    width: "fit",
                    height: "fit",
                    paddingX: "0.5rem",
                    paddingY: "0.25rem",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    border: "none",
                }),
                chipColors[props?.color ?? "neutral"].border,
                chipColors[props?.color ?? "neutral"].backgroundColor,
                props.className,
            )}
        >
            <span
                className={cx(
                    css({
                        fontSize: "10px",
                        lineHeight: "none",
                        color: "none",
                    }),
                    chipColors[props?.color ?? "neutral"].text,
                )}
            >
                {props.text}
            </span>
        </div>
    )
}
