import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type { JSX } from "react"
import type * as v from "valibot"
import { useTabs } from "../../../../../contexts/tabs/useTabs.js"
import { UpdateOneFileForm } from "./UpdateOneFileForm.js"

export function UpdateOneFile(props: { file: v.InferOutput<typeof returnedSchemas.file>; children: JSX.Element }) {
    const { openPanelTab, closeTab } = useTabs()

    return (
        <Button
            className={css({
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                width: "fit-content",
                height: "fit-content",
            })}
            onClick={() => {
                const r = {
                    current: "",
                }
                r.current = openPanelTab(
                    "Modifier le fichier",
                    <div
                        className={css({
                            padding: "2rem",
                        })}
                    >
                        <UpdateOneFileForm
                            file={props.file}
                            onSuccess={() => closeTab(r.current)}
                        />
                    </div>,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
