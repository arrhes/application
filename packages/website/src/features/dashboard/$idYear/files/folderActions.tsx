import { deleteOneFolderRouteDefinition, readAllFoldersRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonGhostContent, Separator, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/css"
import { IconArrowsMove, IconDotsVertical, IconEye, IconPencil, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { ConfirmationModal } from "../../../../components/overlays/dialog/confirmationModal.js"
import { Dialog } from "../../../../components/overlays/dialog/dialog.js"
import { Popover } from "../../../../components/overlays/popover/popover.js"
import { useTabs } from "../../../../contexts/tabs/tabsContext.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { MoveOneFolderForm } from "./moveOneFolderForm.js"
import { UpdateOneFolderForm } from "./updateOneFolderForm.js"

export function FolderActions(props: {
    folder: v.InferOutput<typeof returnedSchemas.folder>
    idOrganization: string
    onFolderOpen: (folderId: string | null) => void
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
            <Popover.Root>
                <Popover.Trigger asChild>
                    <Button>
                        <ButtonGhostContent
                            leftIcon={<IconDotsVertical />}
                            text={undefined}
                        />
                    </Button>
                </Popover.Trigger>
                <Popover.Content
                    align="end"
                    className={css({
                        padding: "0.5rem",
                        gap: "0.25rem",
                    })}
                >
                    <Popover.Close asChild>
                        <Button
                            className={css({
                                width: "100%",
                            })}
                            onClick={() => props.onFolderOpen(props.folder.id)}
                        >
                            <ButtonGhostContent
                                leftIcon={<IconEye />}
                                text="Ouvrir"
                                className={css({
                                    width: "100%",
                                    justifyContent: "start",
                                })}
                            />
                        </Button>
                    </Popover.Close>
                    <Popover.Close asChild>
                        <Button
                            className={css({
                                width: "100%",
                            })}
                            onClick={() => {
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
                            <ButtonGhostContent
                                leftIcon={<IconPencil />}
                                text="Renommer"
                                className={css({
                                    width: "100%",
                                    justifyContent: "start",
                                })}
                            />
                        </Button>
                    </Popover.Close>
                    <Popover.Close asChild>
                        <Button
                            className={css({
                                width: "100%",
                            })}
                            onClick={() => setMoveOpen(true)}
                        >
                            <ButtonGhostContent
                                leftIcon={<IconArrowsMove />}
                                text="Déplacer"
                                className={css({
                                    width: "100%",
                                    justifyContent: "start",
                                })}
                            />
                        </Button>
                    </Popover.Close>
                    <Separator />
                    <Popover.Close asChild>
                        <Button
                            className={css({
                                width: "100%",
                            })}
                            onClick={() => setDeleteOpen(true)}
                        >
                            <ButtonGhostContent
                                leftIcon={<IconTrash />}
                                text="Supprimer"
                                color="danger"
                                className={css({
                                    width: "100%",
                                    justifyContent: "start",
                                })}
                            />
                        </Button>
                    </Popover.Close>
                </Popover.Content>
            </Popover.Root>

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
