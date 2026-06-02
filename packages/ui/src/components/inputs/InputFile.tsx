import { type InputHTMLAttributes, useRef, useState } from "react"
import type { FieldError } from "react-hook-form"
import { css } from "../../utilities/cn.js"
import { Button } from "../buttons/Button.js"

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
    const [localFile, setLocalFile] = useState<File | null>(null)
    // When props.value is provided (controlled mode), derive selectedFile from it;
    // otherwise use the locally-tracked file from the picker / drop zone.
    const selectedFile = props.value !== undefined ? (props.value ?? null) : localFile

    return (
        <div
            aria-label="Zone de dépôt de fichier"
            className={css({
                width: "100%",
                border: "1px solid",
                borderColor: "neutral/20",
                borderStyle: "dashed",
                borderRadius: "md",
                _hover: {
                    backgroundColor: "neutral/5",
                    borderColor: "neutral/30",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            })}
            onDrop={(event) => {
                event.preventDefault()
                if (event.dataTransfer.files) {
                    const file = event.dataTransfer.files[0]
                    setLocalFile(file ?? null)
                    props.onChange?.(file)
                }
            }}
            onDragOver={(event) => event.preventDefault()}
        >
            <input
                ref={inputRef}
                multiple={false}
                type="file"
                aria-label="Sélectionner un fichier"
                onChange={(event) => {
                    if (event.target.files) {
                        const file = event.target.files[0]
                        setLocalFile(file ?? null)
                        props.onChange?.(file)
                    }
                }}
                accept={props.accept ?? (!props.type ? "*" : "image/*")}
                className={css({
                    display: "none",
                    width: "100%",
                    height: "100%",
                })}
            />
            <Button
                onClick={(_event) => {
                    inputRef.current?.click()
                }}
                className={{
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <span
                    className={css({
                        color: "neutral/75",
                        fontSize: "sm",
                    })}
                >
                    {selectedFile?.name ?? props.placeholder ?? "Glissez-déposez ou cliquez pour ajouter un fichier"}
                </span>
            </Button>
        </div>
    )
}
