import { IconStarFilled } from "@tabler/icons-react"
import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"
import { css } from "../../utilities/cn.js"

function inputRating(value: number | undefined | null) {
    if (!value) return 0
    return value
}

function outputRating(value: number) {
    if (value === 0) return undefined
    return value
}

export function InputRating(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
        error?: FieldError
        value?: number | null
        onChange?: (value?: number | null | undefined) => void
        ref?: React.Ref<HTMLInputElement>
    },
) {
    return (
        <div
            className={css({
                display: "flex",
            })}
        >
            <input
                type="hidden"
                aria-label="Note"
                className={css({
                    display: "none",
                })}
                ref={props.ref}
            />
            {Array(5)
                .fill(0)
                .map((_, i) => (
                    <button
                        type="button"
                        key={i}
                        aria-label={`Note ${i + 1}`}
                        className={css({
                            cursor: "pointer",
                            border: 0,
                            padding: 0,
                            background: "transparent",
                        })}
                        onClick={() => {
                            if (!props.onChange) return
                            props?.onChange(outputRating(i === +inputRating(props.value) - 1 ? 0 : i + 1))
                        }}
                    >
                        <IconStarFilled
                            size={16}
                            className={css(
                                {
                                    fill: "none",
                                    stroke: "neutral/50",
                                    _hover: {
                                        fill: "neutral/10",
                                    },
                                },
                                i < +inputRating(props.value)
                                    ? {
                                          fill: "neutral",
                                      }
                                    : undefined,
                            )}
                        />
                    </button>
                ))}
        </div>
    )
}
