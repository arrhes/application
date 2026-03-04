import { deleteOneFileRouteDefinition, readAllFilesRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react"
import { type ReactElement, useState } from "react"
import type * as v from "valibot"
import { ContextMenu } from "../../../../../../../components/overlays/contextMenu/contextMenu.js"
import { DeleteConfirmation } from "../../../../../../../components/overlays/dialog/deleteConfirmation.js"
import { Drawer } from "../../../../../../../components/overlays/drawer/drawer.js"
import { toast } from "../../../../../../../contexts/toasts/useToast.js"
import { applicationRouter } from "../../../../../../../routes/applicationRouter.js"
import { getResponseBodyFromAPI } from "../../../../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../../../../utilities/invalidateData.js"
import { UpdateOneFileForm } from "./$idFile/updateOneFileForm.js"

export function FileContextMenu(props: {
    file: v.InferOutput<typeof returnedSchemas.file>
    idOrganization: string
    idYear: string
    children: ReactElement
}) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    async function handleDelete() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneFileRouteDefinition,
            body: {
                idFile: props.file.id,
                idYear: props.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression du fichier", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllFilesRouteDefinition,
            body: {
                idYear: props.idYear,
            },
        })

        toast({ title: "Fichier supprimé", variant: "success" })
    }

    return (
        <>
            <ContextMenu.Root>
                <ContextMenu.Trigger asChild>{props.children}</ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item
                        leftIcon={<IconEye size={16} />}
                        onSelect={() => {
                            applicationRouter.navigate({
                                to: "/dashboard/organisations/$idOrganization/exercices/$idYear/stockage/$idFile",
                                params: {
                                    idOrganization: props.idOrganization,
                                    idYear: props.idYear,
                                    idFile: props.file.id,
                                },
                            })
                        }}
                    >
                        Voir
                    </ContextMenu.Item>
                    <ContextMenu.Item leftIcon={<IconPencil size={16} />} onSelect={() => setEditOpen(true)}>
                        Modifier
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
                    <Drawer.Header title="Modifier le fichier" />
                    <Drawer.Body>
                        <UpdateOneFileForm file={props.file} onSuccess={() => setEditOpen(false)} />
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>

            {/* Delete dialog (controlled externally) */}
            <DeleteConfirmation
                title="Voulez-vous supprimer ce fichier ?"
                description={
                    <>
                        Cette action supprimera le fichier et toutes les données associées.
                        <br />
                        Cette action est irréversible.
                    </>
                }
                submitText="Supprimer le fichier"
                onSubmit={handleDelete}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    )
}
