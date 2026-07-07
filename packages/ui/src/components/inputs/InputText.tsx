import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"
import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.js"

function inputText(value: string | undefined | null) {
    if (!value) return ""
    return value
}

function outputText(value: string | undefined | null) {
    if (!value) return null
    return value
}

export function InputText(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "className"> & {
        error?: FieldError
        value?: string | null | undefined
        onChange?: (value?: string | null | undefined) => void
        className?: Styles
    },
) {
    const { className, ...rest } = props
    return (
        <div
            className={css(
                {
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
                },
                !props.error
                    ? {
                          borderColor: "neutral/20",
                      }
                    : {
                          borderColor: "error",
                      },
                className,
            )}
        >
            <input
                {...rest}
                type="text"
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
                value={inputText(props.value)}
                onChange={(e) => {
                    if (!props.onChange) return
                    props?.onChange(outputText(e.currentTarget.value))
                }}
            />
        </div>
    )
}
