import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"
import { IMask, IMaskInput } from "react-imask"

export function InputPrice(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "value" | "onChange"> & {
        error?: FieldError
        defaultValue?: string | undefined | null
        value?: string | undefined | null
        onChange: (value: string | undefined) => void
    },
) {
    function input(value: string | undefined | null) {
        if (value === null || value === undefined) return undefined
        return value
    }

    function output(value: string | undefined) {
        if (value === undefined) return value
        return value
    }

    return (
        <div
            className={cx(
                css({
                    height: "32px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    border: "1px solid",
                    borderRadius: "md",
                    _hover: { borderColor: "neutral/30" },
                    _focusWithin: { borderColor: "neutral/50", boxShadow: "inset" },
                }),
                css(props.error ? { borderColor: "error" } : { borderColor: "neutral/20" }),
                props.className,
            )}
        >
            <IMaskInput
                mask="n"
                blocks={{
                    n: {
                        mask: IMask.MaskedNumber,
                        scale: 2,
                    },
                }}
                autofix={false}
                lazy={false}
                overwrite={false}
                eager="append"
                unmask={"typed"}
                onAccept={(value: unknown) => props.onChange(output(String(value)))}
                value={input(props.value)}
                className={css({
                    borderRadius: "inherit",
                    width: "100%",
                    fontSize: "sm",
                    _placeholder: { color: "neutral/25" },
                    padding: "1rem",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                })}
                inputMode="decimal"
            />
        </div>
    )
}
