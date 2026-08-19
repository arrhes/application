import { IconMinus, IconPlus } from "@tabler/icons-react"
import { css } from "../../utilities/cn.js"
import { Button } from "../buttons/Button.js"
import { ButtonOutlineContent } from "../buttons/ButtonOutlineContent.js"

export function InputNumber(props: { value: number; onChange: (value: number) => void; min?: number; label?: string }) {
    const min = props.min ?? 0

    return (
        <div
            className={css({
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
            })}
        >
            <Button
                title="Diminuer"
                onClick={() => props.onChange(Math.max(props.value - 1, min))}
                isDisabled={props.value <= min}
            >
                <ButtonOutlineContent
                    leftIcon={<IconMinus />}
                    text={undefined}
                    isDisabled={props.value <= min}
                />
            </Button>
            <input
                type="number"
                aria-label={props.label ?? "Valeur"}
                min={min}
                value={props.value}
                onChange={(e) => {
                    const raw = e.target.value
                    if (raw === "") {
                        props.onChange(min)
                        return
                    }
                    const val = parseInt(raw, 10)
                    props.onChange(Number.isNaN(val) || val < min ? min : val)
                }}
                className={css({
                    width: "4rem",
                    height: "2rem",
                    textAlign: "center",
                    border: "1px solid token(colors.neutral/20)",
                    borderRadius: "md",
                    background: "transparent",
                    color: "neutral",
                    fontSize: "sm",
                    fontVariantNumeric: "tabular-nums",
                    outline: "none",
                    appearance: "textfield",
                    "&::-webkit-inner-spin-button": {
                        display: "none",
                    },
                    "&::-webkit-outer-spin-button": {
                        display: "none",
                    },
                    _focus: {
                        border: "1px solid token(colors.neutral/50)",
                    },
                })}
            />
            <Button
                title="Augmenter"
                onClick={() => props.onChange(props.value + 1)}
                isDisabled={false}
            >
                <ButtonOutlineContent
                    leftIcon={<IconPlus />}
                    text={undefined}
                    isDisabled={false}
                />
            </Button>
        </div>
    )
}
