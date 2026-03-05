import { Button } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { type InputHTMLAttributes, useRef } from "react"
import type { FieldError } from "react-hook-form"

export function InputFile(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
        error?: FieldError
        value?: File | null
        onChange?: (value?: File | null | undefined) => void
        type?: "image"
    },
) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    return (
        <div
            className={css({
                width: "100%",
                border: "1px solid",
                borderColor: "neutral/20",
                borderStyle: "dashed",
                borderRadius: "md",
                _hover: { backgroundColor: "neutral/5", borderColor: "neutral/30" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            })}
            onDrop={(event) => {
                event.preventDefault()
                if (!props.onChange) return
                if (event.dataTransfer.files) {
                    props.onChange(event.dataTransfer.files[0])
                }
            }}
            onDragOver={(event) => event.preventDefault()}
        >
            <input
                ref={inputRef}
                multiple={false}
                type="file"
                onChange={(event) => {
                    if (!props.onChange) return
                    if (event.target.files) {
                        props.onChange(event.target.files[0])
                    }
                }}
                accept={!props.type ? "*" : "image/*"}
                className={css({ display: "none", width: "100%", height: "100%" })}
            />
            <Button
                onClick={(_event) => {
                    inputRef.current?.click()
                }}
                className={css({
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    padding: { base: "2", md: "3" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                })}
            >
                <span className={css({ color: "neutral/75", fontSize: "sm" })}>
                    {props.value?.name ?? props.placeholder ?? "Glissez-déposez ou cliquez pour ajouter un fichier"}
                </span>
            </Button>
        </div>
    )
}
