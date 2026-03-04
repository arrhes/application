import { deleteOneFolderRouteDefinition, readAllFoldersRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/css"
import { IconDotsVertical, IconEye, IconPencil, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { Dropdown } from "../../../../../../../components/layouts/dropdownMenu/dropdown.js"
import { DeleteConfirmation } from "../../../../../../../components/overlays/dialog/deleteConfirmation.js"
import { Drawer } from "../../../../../../../components/overlays/drawer/drawer.js"
import { toast } from "../../../../../../../contexts/toasts/useToast.js"
import { getResponseBodyFromAPI } from "../../../../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../../../../utilities/invalidateData.js"
import { UpdateOneFolderForm } from "./updateOneFolderForm.js"

export function FolderActions(props: {
    folder: v.InferOutput<typeof returnedSchemas.folder>
    idOrganization: string
    idYear: string
    onFolderOpen: (folderId: string | null) => void
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
            <Dropdown.Root>
                <Dropdown.Trigger>
                    <ButtonGhostContent leftIcon={<IconDotsVertical size={16} />} text={undefined} />
                </Dropdown.Trigger>
                <Dropdown.Content align="end">
                    <Dropdown.Item onSelect={() => props.onFolderOpen(props.folder.id)}>
                        <ButtonGhostContent
                            leftIcon={<IconEye />}
                            text="Ouvrir"
                            className={css({ width: "100%", justifyContent: "start" })}
                        />
                    </Dropdown.Item>
                    <Dropdown.Item onSelect={() => setEditOpen(true)}>
                        <ButtonGhostContent
                            leftIcon={<IconPencil />}
                            text="Renommer"
                            className={css({ width: "100%", justifyContent: "start" })}
                        />
                    </Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item onSelect={() => setDeleteOpen(true)}>
                        <ButtonGhostContent
                            leftIcon={<IconTrash />}
                            text="Supprimer"
                            color="danger"
                            className={css({ width: "100%", justifyContent: "start" })}
                        />
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown.Root>

            <Drawer.Root open={editOpen} onOpenChange={setEditOpen}>
                <Drawer.Content>
                    <Drawer.Header title="Renommer le dossier" />
                    <Drawer.Body>
                        <UpdateOneFolderForm folder={props.folder} onSuccess={() => setEditOpen(false)} />
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>

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
