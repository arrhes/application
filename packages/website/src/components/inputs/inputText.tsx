import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"

export function InputText(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
        error?: FieldError
        value?: string | null | undefined
        onChange?: (value?: string | null | undefined) => void
    },
) {
    function input(value: string | undefined | null) {
        if (!value) return ""
        return value
    }

    function output(value: string | undefined | null) {
        if (!value) return null
        return value
    }

    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "1px solid",
                    borderRadius: "md",
                    _hover: { borderColor: "neutral/50" },
                    _focusWithin: { borderColor: "neutral/50", boxShadow: "inset" },
                }),
                css(!props.error ? { borderColor: "neutral/20" } : { borderColor: "error" }),
                props.className,
            )}
        >
            <input
                {...props}
                type="text"
                className={css({
                    width: "100%",
                    fontSize: "0.875rem",
                    lineHeight: "1rem",
                    fontWeight: "400",
                    _placeholder: { color: "neutral/25" },
                    backgroundColor: "transparent",
                    padding: "0.5rem",
                    _focusWithin: { borderColor: "neutral/50", outline: "none" },
                })}
                value={input(props.value)}
                onChange={(e) => {
                    if (!props.onChange) return
                    props?.onChange(output(e.currentTarget.value))
                }}
            />
        </div>
    )
}
