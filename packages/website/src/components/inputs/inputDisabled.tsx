import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"

export function InputDisabled(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
        error?: FieldError
        value?: string | null
        onChange?: (value?: string | null | undefined) => void
    },
) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    height: "32px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "1px solid",
                    borderRadius: "md",
                    backgroundColor: "neutral/5",
                    cursor: "not-allowed",
                    opacity: "0.5",
                }),
                css(props.error ? { borderColor: "error" } : { borderColor: "neutral/20" }),
            )}
        >
            <input
                className={css({
                    width: "100%",
                    height: "100%",
                    fontSize: "sm",
                    lineHeight: "none",
                    backgroundColor: "transparent",
                    padding: "1rem",
                    borderRadius: "md",
                    cursor: "not-allowed",
                    color: "neutral/50",
                })}
                value={props.value ?? ""}
                disabled
            />
        </div>
    )
}
