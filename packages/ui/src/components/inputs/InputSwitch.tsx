import type { ComponentPropsWithRef } from "react"
import { css, cx } from "../../utilities/cn.js"

type InputSwitch = {
    value: boolean
    onChange: (value: boolean) => void
    ref?: ComponentPropsWithRef<"button">["ref"]
    className?: string
    autoFocus?: boolean
    disabled?: boolean
}

export function InputSwitch(props: InputSwitch) {
    return (
        <button
            ref={props.ref}
            type="button"
            role="switch"
            aria-checked={props.value}
            data-state={props.value ? "checked" : "unchecked"}
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
                    _disabled: {
                        cursor: "not-allowed",
                        opacity: "0.5",
                    },
                    backgroundColor: "white",
                    "&[data-state=checked]": {
                        backgroundColor: "success/5",
                        borderColor: "neutral",
                    },
                    _focus: {
                        boxShadow: "inset",
                    },
                }),
                props.className,
            )}
            onClick={() => !props.disabled && props.onChange(!props.value)}
            disabled={props.disabled}
        >
            <span
                data-state={props.value ? "checked" : "unchecked"}
                className={css({
                    pointerEvents: "none",
                    display: "block",
                    height: "4",
                    width: "4",
                    borderRadius: "100%",
                    backgroundColor: "neutral/10",
                    transform: "translateX(4px)",
                    boxShadow: "lg",
                    transition: "transform",
                    "&[data-state=checked]": {
                        backgroundColor: "neutral",
                        transform: "translateX(18px)",
                    },
                })}
            />
        </button>
    )
}
