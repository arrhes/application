import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"
import { IMaskInput } from "react-imask"
import { css, cx } from "../../utilities/cn.js"

export function InputCurrency(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "value" | "onChange"> & {
        error?: FieldError
        defaultValue?: number | undefined | null
        value?: number | undefined | null
        onChange: (value: number | undefined) => void
    },
) {
    function input(value: typeof props.value) {
        if (value === null || value === undefined) return undefined
        return (value / 100).toFixed(2).replace(".", ",")
    }

    function output(value: string | number | undefined) {
        if (value === undefined) return undefined

        if (typeof value === "number") {
            if (Number.isNaN(value)) return undefined
            return Math.round(value * 100)
        }

        const normalizedValue = value.replaceAll("\u202f", "").replaceAll(" ", "").replace(",", ".")
        const numberValue = Number(normalizedValue)
        if (Number.isNaN(numberValue)) return undefined
        return Math.round(numberValue * 100)
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
                    _hover: {
                        borderColor: "neutral/50",
                    },
                    _focusWithin: {
                        borderColor: "neutral/50",
                        boxShadow: "inset",
                    },
                }),
                css(
                    !props.error
                        ? {
                              borderColor: "neutral/20",
                          }
                        : {
                              borderColor: "error",
                          },
                ),
                props.className,
            )}
        >
            <IMaskInput
                mask={Number}
                scale={2}
                radix=","
                mapToRadix={[
                    ".",
                ]}
                thousandsSeparator="\u202f"
                normalizeZeros
                padFractionalZeros
                autofix={false}
                lazy={false}
                overwrite={false}
                eager="append"
                unmask={"typed"}
                onAccept={(value) => props.onChange(output(value))}
                value={input(props.value)}
                className={css({
                    width: "100%",
                    fontSize: "0.875rem",
                    lineHeight: "1rem",
                    fontWeight: "400",
                    _placeholder: {
                        color: "neutral/25",
                    },
                    backgroundColor: "transparent",
                    padding: "0.5rem",
                    _focusWithin: {
                        borderColor: "neutral/50",
                        outline: "none",
                    },
                })}
                inputMode="decimal"
            />
            <span
                className={css({
                    display: "inline-flex",
                    alignItems: "center",
                    paddingRight: "0.75rem",
                    color: "neutral/50",
                    fontSize: "sm",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                })}
            >
                €
            </span>
        </div>
    )
}
