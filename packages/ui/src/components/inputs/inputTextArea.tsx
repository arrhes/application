import type { ComponentPropsWithRef } from "react"
import type { FieldError } from "react-hook-form"
import { css, cx } from "../../utilities/cn.js"

const sharedStyles = css({
    width: "100%",
    padding: "1rem",
    border: "1px solid",
    borderRadius: "md",
    fontSize: "sm",
    outline: "none",
    resize: "none",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    gridArea: "1 / 1 / 2 / 2",
    boxSizing: "border-box",
})

export function InputTextArea(
    props: Omit<ComponentPropsWithRef<"textarea">, "value" | "onChange" | "rows"> & {
        error?: FieldError
        value?: string | null
        onChange: (value?: string | null | undefined) => void
    },
) {
    function input(value: string | undefined | null) {
        if (!value) return ""
        return value
    }

    function output(value: string) {
        if (!value) return null
        return value
    }

    const borderClass = css(props.error ? { borderColor: "error" } : { borderColor: "neutral/20" })

    return (
        <div
            className={css({
                display: "grid",
                width: "100%",
                minHeight: "3.5rem",
                flexShrink: "0",
            })}
        >
            {/* Invisible replica that drives the height */}
            <span
                aria-hidden="true"
                className={cx(
                    sharedStyles,
                    borderClass,
                    css({
                        visibility: "hidden",
                        pointerEvents: "none",
                        userSelect: "none",
                    }),
                )}
            >
                {input(props.value)}{" "}
            </span>

            <textarea
                {...props}
                className={cx(
                    sharedStyles,
                    borderClass,
                    css({
                        _placeholder: { color: "neutral/25" },
                        _hover: { borderColor: "neutral/50" },
                        _focusWithin: { borderColor: "neutral/50", boxShadow: "inset" },
                        overflow: "hidden",
                    }),
                    props.className,
                )}
                value={input(props.value)}
                onChange={(e) => {
                    if (!props.onChange) return
                    props.onChange(output(e.currentTarget.value))
                }}
            />
        </div>
    )
}
