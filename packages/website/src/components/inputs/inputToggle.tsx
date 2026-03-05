import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type * as SwitchPrimitives from "@radix-ui/react-switch"
import type { ComponentProps, JSX } from "react"

export function InputToggle<TValue extends string | boolean>(
    props: Omit<ComponentProps<typeof SwitchPrimitives.Root>, "value" | "onChange"> & {
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
                height: "32px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                border: "1px solid",
                borderColor: "neutral/20",
                borderRadius: "sm",
                cursor: "pointer",
                _focus: { borderColor: "neutral/50", boxShadow: "inset" },
                outline: "none",
            })}
        >
            {props.options.map((option, index) => {
                const isSelected = props.value === option.value
                return (
                    <Button
                        key={`option_${index}`}
                        onClick={() => {
                            if (isSelected === true) {
                                props.onChange(null)
                                return
                            }
                            props.onChange(option.value)
                        }}
                        className={css({
                            borderRight: "1px solid",
                            borderColor: "neutral/5",
                            _last: { borderRight: "none" },
                        })}
                    >
                        <ButtonGhostContent
                            className={cx(
                                css({
                                    transition: "all 200ms ease-in-out",
                                    borderRadius: "none",
                                    border: "none",
                                }),
                                css(
                                    isSelected
                                        ? {
                                              backgroundColor: "neutral/10",
                                              outline: "1px solid",
                                              outlineColor: "neutral",
                                              borderRadius: "sm",
                                          }
                                        : {},
                                ),
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
