import type { InputHTMLAttributes } from "react"
import { css, cx } from "../../utilities/cn.js"

export function InputCheckbox(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "checked" | "onChange"> & {
        checked: boolean
        indeterminate?: boolean
        onChange: (checked: boolean) => void
    },
) {
    const { indeterminate, onChange, ...rest } = props
    return (
        <div
            className={css({
                padding: "0.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            })}
        >
            <input
                {...rest}
                type="checkbox"
                ref={(el) => {
                    if (el) el.indeterminate = indeterminate ?? false
                }}
                checked={props.checked}
                onChange={(e) => onChange(e.currentTarget.checked)}
                className={cx(
                    css({
                        cursor: "pointer",
                        flexShrink: "0",
                        appearance: "none",
                        display: "grid",
                        placeContent: "center",
                        width: "1rem",
                        height: "1rem",
                        backgroundColor: "white",
                        border: "1.5px solid",
                        borderColor: "neutral/30",
                        borderRadius: "sm",
                        transition: "border-color 50ms ease-in-out, background-color 50ms ease-in-out",
                        _before: {
                            content: '""',
                            width: "0.65em",
                            height: "0.65em",
                            clipPath: "polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)",
                            transformOrigin: "bottom left",
                            transform: "scale(0)",
                            transition: "transform 50ms ease-in-out",
                            backgroundColor: "white",
                        },
                        _checked: {
                            borderColor: "primary",
                            backgroundColor: "primary",
                            _before: {
                                transform: "scale(1)",
                            },
                        },
                        _indeterminate: {
                            borderColor: "primary",
                            backgroundColor: "primary",
                            _before: {
                                clipPath: "polygon(0 40%, 100% 40%, 100% 60%, 0% 60%)",
                                transformOrigin: "center",
                                transform: "scale(1)",
                            },
                        },
                    }),
                    props.className,
                )}
            />
        </div>
    )
}
