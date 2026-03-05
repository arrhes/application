import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconStarFilled } from "@tabler/icons-react"
import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"

export function InputRating(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
        error?: FieldError
        value?: number | null
        onChange?: (value?: number | null | undefined) => void
        ref?: React.Ref<HTMLInputElement>
    },
) {
    function input(value: number | undefined | null) {
        if (!value) return 0
        return value
    }

    function output(value: number) {
        if (value === 0) return undefined
        return value
    }

    return (
        <div className={css({ display: "flex" })}>
            <input className={css({ display: "none" })} ref={props.ref} />
            {Array(5)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={css({ cursor: "pointer" })}
                        onClick={() => {
                            if (!props.onChange) return
                            props?.onChange(output(i === +input(props.value) - 1 ? 0 : i + 1))
                        }}
                    >
                        <IconStarFilled
                            size={16}
                            className={cx(
                                css({
                                    fill: "none",
                                    stroke: "neutral/50",
                                    _hover: { fill: "neutral/10" },
                                }),
                                css(i < +input(props.value) ? { fill: "neutral" } : {}),
                            )}
                        />
                    </div>
                ))}
        </div>
    )
}
