import { readAllFilesRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/css"
import { IconArrowsMove, IconEye, IconPencil, IconTrash } from "@tabler/icons-react"
import { type ReactElement, useState } from "react"
import type * as v from "valibot"
import { ContextMenu } from "../../../../components/overlays/contextMenu/contextMenu.js"
import { ConfirmationModal } from "../../../../components/overlays/dialog/ConfirmationModal.js"
import { Dialog } from "../../../../components/overlays/dialog/dialog.js"
import { useTabs } from "../../../../contexts/tabs/useTabs.js"
import { applicationRouter } from "../../../../routes/applicationRouter.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { UpdateOneFileForm } from "./$idFile/UpdateOneFileForm.js"
import { deleteFileWithSignedUrl } from "./deleteFileWithSignedUrl.js"
import { MoveOneFileForm } from "./MoveOneFileForm.js"

export function FileContextMenu(props: {
    file: v.InferOutput<typeof returnedSchemas.file>
    idOrganization: string
    children: ReactElement
}) {
    const [moveOpen, setMoveOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const { openPanelTab, closeTab } = useTabs()

    async function handleDelete() {
        const isDeleted = await deleteFileWithSignedUrl({
            idFile: props.file.id,
        })

        if (isDeleted === false) {
            toast({
                title: "Erreur lors de la suppression du fichier",
                variant: "error",
            })
            return
        }

        await invalidateData({
            routeDefinition: readAllFilesRouteDefinition,
            body: {},
        })

        toast({
            title: "Fichier supprimé",
            variant: "success",
        })
    }

    return (
        <>
            <ContextMenu.Root>
                <ContextMenu.Trigger asChild>{props.children}</ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item
                        leftIcon={<IconEye />}
                        onSelect={() => {
                            applicationRouter.navigate({
                                to: "/dashboard/organisations/$idOrganization/stockage/$idFile",
                                params: {
                                    idOrganization: props.idOrganization,
                                    idFile: props.file.id,
                                },
                            })
                        }}
                    >
                        Ouvrir
                    </ContextMenu.Item>
                    <ContextMenu.Item
                        leftIcon={<IconPencil />}
                        onSelect={() => {
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
                        Modifier
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
                        <Dialog.Title>Déplacer le fichier</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body
                        className={css({
                            alignItems: "stretch",
                        })}
                    >
                        <MoveOneFileForm
                            file={props.file}
                            onSuccess={() => setMoveOpen(false)}
                        />
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Root>

            {/* Delete dialog (controlled externally) */}
            <ConfirmationModal
                title="Voulez-vous supprimer ce fichier ?"
                description={
                    <>
                        Cette action supprimera le fichier et toutes les données associées.
                        <br />
                        Cette action est irréversible.
                    </>
                }
                submitButtonProps={{
                    color: "danger",
                    text: "Supprimer le fichier",
                }}
                onSubmit={handleDelete}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    )
}
