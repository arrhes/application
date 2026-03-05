import { deleteOneFolderRouteDefinition, readAllFoldersRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { type ReactElement, useState } from "react"
import type * as v from "valibot"
import { ContextMenu } from "../../../../components/overlays/contextMenu/contextMenu.js"
import { DeleteConfirmation } from "../../../../components/overlays/dialog/deleteConfirmation.js"
import { Drawer } from "../../../../components/overlays/drawer/drawer.js"
import { toast } from "../../../../contexts/toasts/useToast.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { UpdateOneFolderForm } from "./updateOneFolderForm.js"

export function FolderContextMenu(props: {
    folder: v.InferOutput<typeof returnedSchemas.folder>
    idOrganization: string
    idYear: string
    children: ReactElement
}) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    async function handleDelete() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneFolderRouteDefinition,
            body: {
                idFolder: props.folder.id,
                idYear: props.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression du dossier", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllFoldersRouteDefinition,
            body: {
                idYear: props.idYear,
            },
        })

        toast({ title: "Dossier supprimé", variant: "success" })
    }

    return (
        <>
            <ContextMenu.Root>
                <ContextMenu.Trigger asChild>{props.children}</ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item leftIcon={<IconPencil size={16} />} onSelect={() => setEditOpen(true)}>
                        Renommer
                    </ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item
                        leftIcon={<IconTrash size={16} />}
                        color="danger"
                        onSelect={() => setDeleteOpen(true)}
                    >
                        Supprimer
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Root>

            {/* Edit drawer (controlled externally) */}
            <Drawer.Root open={editOpen} onOpenChange={setEditOpen}>
                <Drawer.Content>
                    <Drawer.Header title="Renommer le dossier" />
                    <Drawer.Body>
                        <UpdateOneFolderForm folder={props.folder} onSuccess={() => setEditOpen(false)} />
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>

            {/* Delete dialog (controlled externally) */}
            <DeleteConfirmation
                title="Voulez-vous supprimer ce dossier ?"
                description={
                    <>
                        Cette action supprimera le dossier et tous ses sous-dossiers.
                        <br />
                        Les fichiers contenus ne seront pas supprimés.
                        <br />
                        Cette action est irréversible.
                    </>
                }
                submitText="Supprimer le dossier"
                onSubmit={handleDelete}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    )
}
