import { IconEye, IconEyeClosed } from "@tabler/icons-react"
import type { InputHTMLAttributes } from "react"
import { useState } from "react"
import type { FieldError } from "react-hook-form"
import { css, cx } from "../../utilities/cn.js"
import { Button } from "../buttons/button.js"

export function InputPassword(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
        error?: FieldError
        value?: string | null
        onChange: (value?: string | null | undefined) => void
        autoFocus?: boolean
        ref?: React.Ref<HTMLInputElement>
    },
) {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    function input(value: string | undefined | null) {
        if (!value) return ""
        return value
    }

    function output(value: string) {
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
            <input
                {...props}
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
                value={input(props.value)}
                onChange={(e) => props.onChange(output(e.currentTarget.value))}
            />
            <Button
                onClick={handleClickShowPassword}
                className={css({
                    _hover: {
                        backgroundColor: "neutral/5",
                    },
                    borderRadius: "md",
                    padding: "0.25rem",
                    margin: "0.25rem",
                })}
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
