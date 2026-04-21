import { type InputHTMLAttributes, useEffect, useRef, useState } from "react"
import type { FieldError } from "react-hook-form"
import { css } from "../../utilities/cn.js"
import { Button } from "../buttons/button.js"

export function InputFile(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
        error?: FieldError
        value?: File | null
        onChange?: (value?: File | null | undefined) => void
        type?: "image"
        accept?: string
    },
) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(props.value ?? null)

    useEffect(() => {
        if (props.value === null) {
            setSelectedFile(null)
            return
        }

        if (props.value !== undefined) {
            setSelectedFile(props.value)
        }
    }, [props.value])

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
                if (event.dataTransfer.files) {
                    const file = event.dataTransfer.files[0]
                    setSelectedFile(file ?? null)
                    props.onChange?.(file)
                }
            }}
            onDragOver={(event) => event.preventDefault()}
        >
            <input
                ref={inputRef}
                multiple={false}
                type="file"
                onChange={(event) => {
                    if (event.target.files) {
                        const file = event.target.files[0]
                        setSelectedFile(file ?? null)
                        props.onChange?.(file)
                    }
                }}
                accept={props.accept ?? (!props.type ? "*" : "image/*")}
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
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                })}
            >
                <span className={css({ color: "neutral/75", fontSize: "sm" })}>
                    {selectedFile?.name ?? props.placeholder ?? "Glissez-déposez ou cliquez pour ajouter un fichier"}
                </span>
            </Button>
        </div>
    )
}
