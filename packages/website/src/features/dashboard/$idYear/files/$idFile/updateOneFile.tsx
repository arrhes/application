import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { type JSX, useState } from "react"
import type * as v from "valibot"
import { Drawer } from "../../../../../components/overlays/drawer/drawer.js"
import { UpdateOneFileForm } from "./updateOneFileForm.js"

export function UpdateOneFile(props: { file: v.InferOutput<typeof returnedSchemas.file>; children: JSX.Element }) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier le fichier" />
                <Drawer.Body>
                    <UpdateOneFileForm file={props.file} onSuccess={() => setOpen(false)} />
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
