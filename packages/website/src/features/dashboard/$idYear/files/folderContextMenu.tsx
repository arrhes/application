import { deleteOneFolderRouteDefinition, readAllFoldersRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/css"
import { IconArrowsMove, IconPencil, IconTrash } from "@tabler/icons-react"
import { type ReactElement, useState } from "react"
import type * as v from "valibot"
import { ContextMenu } from "../../../../components/overlays/contextMenu/contextMenu.js"
import { ConfirmationModal } from "../../../../components/overlays/dialog/confirmationModal.js"
import { Dialog } from "../../../../components/overlays/dialog/dialog.js"
import { useTabs } from "../../../../contexts/tabs/tabsContext.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { MoveOneFolderForm } from "./moveOneFolderForm.js"
import { UpdateOneFolderForm } from "./updateOneFolderForm.js"

export function FolderContextMenu(props: {
    folder: v.InferOutput<typeof returnedSchemas.folder>
    idOrganization: string
    children: ReactElement
}) {
    const [moveOpen, setMoveOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const { openPanelTab, closeTab } = useTabs()

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
        <>
            <ContextMenu.Root>
                <ContextMenu.Trigger asChild>{props.children}</ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item
                        leftIcon={<IconPencil />}
                        onSelect={() => {
                            const r = {
                                current: "",
                            }
                            r.current = openPanelTab(
                                "Renommer le dossier",
                                <div
                                    className={css({
                                        padding: "2rem",
                                    })}
                                >
                                    <UpdateOneFolderForm
                                        folder={props.folder}
                                        onSuccess={() => closeTab(r.current)}
                                    />
                                </div>,
                            )
                        }}
                    >
                        Renommer
                    </ContextMenu.Item>
                    <ContextMenu.Item
                        leftIcon={<IconArrowsMove />}
                        onSelect={() => setMoveOpen(true)}
                    >
                        Déplacer
                    </ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item
                        leftIcon={<IconTrash />}
                        color="danger"
                        onSelect={() => setDeleteOpen(true)}
                    >
                        Supprimer
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Root>

            <Dialog.Root
                open={moveOpen}
                onOpenChange={setMoveOpen}
            >
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Déplacer le dossier</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body
                        className={css({
                            alignItems: "stretch",
                        })}
                    >
                        <MoveOneFolderForm
                            folder={props.folder}
                            onSuccess={() => setMoveOpen(false)}
                        />
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Root>

            {/* Delete dialog (controlled externally) */}
            <ConfirmationModal
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
                submitButtonProps={{
                    color: "danger",
                    text: "Supprimer le dossier",
                }}
                onSubmit={handleDelete}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    )
}
