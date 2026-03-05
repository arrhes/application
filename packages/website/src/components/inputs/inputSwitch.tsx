import { css, cx } from "@arrhes/ui/utilities/cn.js"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import type { ComponentProps } from "react"

type InputSwitch = Omit<ComponentProps<typeof SwitchPrimitives.Root>, "value" | "onChange"> & {
    value: boolean
    onChange: (value: boolean) => void
}

export function InputSwitch(props: InputSwitch) {
    function input(value: boolean | undefined | null) {
        if (!value) return false
        return value
    }

    function output(value: boolean) {
        return value
    }

    return (
        <SwitchPrimitives.Root
            ref={props.ref}
            className={cx(
                css({
                    display: "inline-flex",
                    height: "6",
                    width: "10",
                    flexShrink: "0",
                    cursor: "pointer",
                    alignItems: "center",
                    borderRadius: "100%",
                    border: "1px solid",
                    borderColor: "neutral/20",
                    _disabled: { cursor: "not-allowed", opacity: "0.5" },
                    backgroundColor: "white",
                    _checked: { backgroundColor: "success/5", borderColor: "neutral" },
                    _focus: { boxShadow: "inset" },
                }),
                props.className,
            )}
            checked={input(props.value)}
            onCheckedChange={(checked) => props.onChange(output(checked))}
            autoFocus={props.autoFocus}
        >
            <SwitchPrimitives.Thumb
                className={css({
                    pointerEvents: "none",
                    display: "block",
                    height: "4",
                    width: "4",
                    borderRadius: "100%",
                    _checked: { backgroundColor: "neutral", transform: "translateX(18px)" },
                    backgroundColor: "neutral/10",
                    transform: "translateX(4px)",
                    boxShadow: "lg",
                    transition: "transform",
                })}
            />
        </SwitchPrimitives.Root>
    )
}
