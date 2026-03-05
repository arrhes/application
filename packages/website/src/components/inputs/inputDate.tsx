import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { type InputHTMLAttributes, useRef, useState } from "react"
import type { FieldError } from "react-hook-form"
import { IMask, IMaskInput } from "react-imask"

function isoToDisplay(value: string | undefined | null) {
    if (!value) return ""
    if (String(new Date(value)) === "Invalid Date") return ""

    const date = new Date(value)
    let day = String(date.getDate())
    let month = String(date.getMonth() + 1)
    const year = String(date.getFullYear())

    if (date.getDate() < 10) day = `0${day}`
    if (date.getMonth() + 1 < 10) month = `0${month}`
    return [day, month, year].join(" / ")
}

function displayToIso(value: string | undefined) {
    if (!value) return undefined
    const parts = value.split(" / ")
    if (parts.length !== 3) return undefined
    const day = Number(parts[0])
    const month = Number(parts[1])
    const year = Number(parts[2])
    if (!day || !month || !year || year < 1930) return undefined
    return new Date(year, month - 1, day, 12, 0, 0).toISOString()
}

export function InputDate(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "value" | "onChange"> & {
        error?: FieldError
        defaultValue?: string | undefined | null
        value?: string | undefined | null
        onChange: (value: string | undefined) => void
    },
) {
    const lastEmittedIso = useRef<string | undefined>(undefined)
    const [displayValue, setDisplayValue] = useState(() => isoToDisplay(props.value))

    const externalDisplay = isoToDisplay(props.value)
    if (externalDisplay !== isoToDisplay(lastEmittedIso.current) && externalDisplay !== displayValue) {
        setDisplayValue(externalDisplay)
        lastEmittedIso.current = undefined
    }

    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    gap: "0.5rem",
                    border: "1px solid",
                    borderRadius: "md",
                    _hover: { borderColor: "neutral/50" },
                    _focusWithin: { borderColor: "neutral/50", boxShadow: "inset" },
                }),
                css(props.error ? { borderColor: "error" } : { borderColor: "neutral/20" }),
                props.className,
            )}
        >
            <IMaskInput
                mask="d{ / }`m{ / }`Y"
                blocks={{
                    d: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 31,
                        maxLength: 2,
                        placeholderChar: "J",
                    },
                    m: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12,
                        maxLength: 2,
                        placeholderChar: "M",
                    },
                    Y: {
                        mask: IMask.MaskedRange,
                        from: 1930,
                        to: 2100,
                        maxLength: 4,
                        placeholderChar: "Y",
                    },
                }}
                autofix={false}
                lazy={false}
                overwrite="shift"
                eager="append"
                unmask="typed"
                placeholder={"JJ / MM / YYYY"}
                onAccept={(value: unknown) => {
                    const display = String(value)
                    setDisplayValue(display)
                    const iso = displayToIso(display)
                    lastEmittedIso.current = iso
                    props.onChange(iso)
                }}
                value={displayValue}
                className={css({
                    borderRadius: "inherit",
                    width: "100%",
                    fontSize: "0.875rem",
                    lineHeight: "1rem",
                    fontWeight: "400",
                    _placeholder: { color: "neutral/25" },
                    padding: "0.5rem",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    _focusWithin: { borderColor: "neutral/50", outline: "none" },
                })}
                inputMode="decimal"
            />
        </div>
    )
}
