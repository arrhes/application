import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { type ComponentPropsWithRef, useRef } from "react"
import type { FieldError } from "react-hook-form"

export function InputTextArea(
    props: Omit<ComponentPropsWithRef<"textarea">, "value" | "onChange"> & {
        error?: FieldError
        value?: string | null
        onChange: (value?: string | null | undefined) => void
    },
) {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    function input(value: string | undefined | null) {
        if (!value) return ""
        return value
    }

    function output(value: string) {
        if (!value) return null
        return value
    }

    return (
        <textarea
            {...props}
            ref={textAreaRef}
            className={cx(
                css({
                    width: "100%",
                    minH: "128px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "1rem",
                    border: "1px solid",
                    borderRadius: "md",
                    fontSize: "sm",
                    _placeholder: { color: "neutral/25" },
                    _hover: { borderColor: "neutral/30" },
                    _focus: { borderColor: "neutral/50", boxShadow: "inset" },
                    outline: "none",
                    flexShrink: "0",
                    resize: "none",
                    height: "fit",
                    overflowY: "auto",
                }),
                css(props.error ? { borderColor: "error" } : { borderColor: "neutral/20" }),
                props.className,
            )}
            value={input(props.value)}
            onChange={(e) => {
                if (!props.onChange) return
                props?.onChange(output(e.currentTarget.value))

                if (!textAreaRef.current) return
                textAreaRef.current.style.height = "auto" // will not work without this!
                textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
            }}
        />
    )
}
