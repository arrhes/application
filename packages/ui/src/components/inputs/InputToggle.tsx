import type { ButtonHTMLAttributes, JSX } from "react"
import { css } from "../../utilities/cn.js"
import { Button } from "../buttons/Button.js"
import { ButtonGhostContent } from "../buttons/ButtonGhostContent.js"

export function InputToggle<TValue extends string | boolean>(
    props: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange"> & {
        value: TValue | null | undefined
        onChange: (value: TValue | null | undefined) => void
        options: Array<{
            icon?: JSX.Element
            label?: string
            value: TValue
        }>
    },
) {
    return (
        <div
            className={css({
                width: "fit",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                border: "1px solid",
                borderColor: "neutral/20",
                borderRadius: "md",
                cursor: "pointer",
                _focus: {
                    borderColor: "neutral/50",
                    boxShadow: "inset",
                },
                outline: "none",
            })}
        >
            {props.options.map((option) => {
                const isSelected = props.value === option.value
                return (
                    <Button
                        key={`option_${option.value}`}
                        onClick={() => {
                            if (isSelected === true) {
                                props.onChange(null)
                                return
                            }
                            props.onChange(option.value)
                        }}
                        className={{
                            borderRight: "1px solid",
                            borderRightColor: "neutral/5",
                            _last: {
                                borderRight: "none",
                            },
                        }}
                    >
                        <ButtonGhostContent
                            className={css.raw(
                                {
                                    transition: "all 50ms ease-in-out",
                                    borderRadius: "none",
                                    border: "none",
                                },
                                isSelected
                                    ? {
                                          backgroundColor: "neutral/10",
                                          outline: "1px solid",
                                          outlineColor: "neutral",
                                      }
                                    : undefined,
                            )}
                            text={option.label}
                            leftIcon={option.icon}
                        />
                    </Button>
                )
            })}
        </div>
    )
}
