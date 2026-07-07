import { IconEye, IconEyeClosed } from "@tabler/icons-react"
import type { InputHTMLAttributes } from "react"
import { useState } from "react"
import type { FieldError } from "react-hook-form"
import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.js"
import { Button } from "../buttons/Button.js"

function inputPassword(value: string | null | undefined) {
    if (!value) return ""
    return value
}

function outputPassword(value: string | undefined | null) {
    if (!value) return null
    return value
}

export function InputPassword(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "className"> & {
        error?: FieldError
        value?: string | null
        onChange: (value?: string | null | undefined) => void
        autoFocus?: boolean
        ref?: React.Ref<HTMLInputElement>
        className?: Styles
    },
) {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const { className, ...inputProps } = props

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
                {...inputProps}
                type={showPassword ? "text" : "password"}
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
                ref={props.ref}
                value={inputPassword(props.value)}
                onChange={(e) => props.onChange(outputPassword(e.currentTarget.value))}
            />
            <Button
                onClick={handleClickShowPassword}
                className={{
                    _hover: {
                        backgroundColor: "neutral/5",
                    },
                    borderRadius: "md",
                    padding: "0.25rem",
                    margin: "0.25rem",
                }}
                tabIndex={-1}
            >
                {showPassword ? (
                    <IconEye
                        size={16}
                        className={css({
                            stroke: "neutral/50",
                        })}
                    />
                ) : (
                    <IconEyeClosed
                        size={16}
                        className={css({
                            stroke: "neutral/50",
                        })}
                    />
                )}
            </Button>
        </div>
    )
}
