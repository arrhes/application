import { deleteOneFolderRouteDefinition, readAllFoldersRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent, ButtonPlainContent, toast, useModalStore } from "@arrhes/ui"
import { IconArrowsMove, IconPencil, IconTrash } from "@tabler/icons-react"
import { type ReactElement, useId } from "react"
import type * as v from "valibot"
import { ContextMenu } from "../../../../components/overlays/contextMenu/contextMenu.js"
import { Dialog } from "../../../../components/overlays/dialog/dialog.js"
import { useRightPanel } from "../../../../contexts/rightPanel/RightPanelContext.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { MoveOneFolderForm } from "./MoveOneFolderForm.js"
import { UpdateOneFolderForm } from "./UpdateOneFolderForm.js"

export function FolderContextMenu(props: {
    folder: v.InferOutput<typeof returnedSchemas.folder>
    idOrganization: string
    children: ReactElement
}) {
    const { openPanel } = useRightPanel()
    const deleteModalId = useId()
    const { open: openModal, close: closeModal } = useModalStore()

    async function handleDelete() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneFolderRouteDefinition,
            body: {
                idFolder: props.folder.id,
            },
        })

        if (deleteResponse.ok === false) {
            toast({
                title: "Erreur lors de la suppression du dossier",
                variant: "error",
            })
            return
        }

        await invalidateData({
            routeDefinition: readAllFoldersRouteDefinition,
            body: {},
        })

        toast({
            title: "Dossier supprimé",
            variant: "success",
        })
    }

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger asChild>{props.children}</ContextMenu.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item
                    leftIcon={<IconPencil />}
                    onSelect={() => openPanel(<UpdateOneFolderForm folder={props.folder} />, "Renommer le dossier")}
                >
                    Renommer
                </ContextMenu.Item>
                <ContextMenu.Item
                    leftIcon={<IconArrowsMove />}
                    onSelect={() => openPanel(<MoveOneFolderForm folder={props.folder} />, "Déplacer le dossier")}
                >
                    Déplacer
                </ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item
                    leftIcon={<IconTrash />}
                    color="danger"
                    onSelect={() =>
                        openModal(
                            deleteModalId,
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title>Voulez-vous supprimer ce dossier ?</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Dialog.Description>
                                        Cette action supprimera le dossier et tous ses sous-dossiers. Les fichiers
                                        contenus ne seront pas supprimés. Cette action est irréversible.
                                    </Dialog.Description>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Button onClick={() => closeModal(deleteModalId)}>
                                        <ButtonOutlineContent text="Annuler" />
                                    </Button>
                                    <Button
                                        hasLoader
                                        onClick={async () => {
                                            await handleDelete()
                                            closeModal(deleteModalId)
                                        }}
                                    >
                                        <ButtonPlainContent
                                            color="danger"
                                            text="Supprimer le dossier"
                                        />
                                    </Button>
                                </Dialog.Footer>
                            </Dialog.Content>,
                        )
                    }
                >
                    Supprimer
                </ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu.Root>
    )
}
