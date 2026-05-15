import {
    ocrFileRouteDefinition,
    readAllFilesRouteDefinition,
    readOrganizationBillingRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent, Separator, toast, useModalStore } from "@arrhes/ui"
import { css } from "@arrhes/ui/css"
import { IconArrowsMove, IconDotsVertical, IconEye, IconFileText, IconPencil, IconTrash } from "@tabler/icons-react"
import { useId, useState } from "react"
import type * as v from "valibot"
import { Dialog } from "../../../../components/overlays/dialog/dialog.js"
import { Popover } from "../../../../components/overlays/popover/popover.js"
import { useTabs } from "../../../../contexts/tabs/useTabs.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.ts"
import { UpdateOneFileForm } from "./$idFile/UpdateOneFileForm.js"
import { deleteFileWithSignedUrl } from "./deleteFileWithSignedUrl.js"
import { MoveOneFileForm } from "./MoveOneFileForm.js"

export function FileActions(props: { file: v.InferOutput<typeof returnedSchemas.file>; idOrganization: string }) {
    const moveModalId = useId()
    const deleteModalId = useId()
    const { open: openModal, close: closeModal } = useModalStore()
    const [ocrLoading, setOcrLoading] = useState(false)
    const [ocrTooltipOpen, setOcrTooltipOpen] = useState(false)
    const { openPanelTab, closeTab, openTab } = useTabs()

    const subscription = useDataFromAPI({
        routeDefinition: readOrganizationBillingRouteDefinition,
        body: {},
    })
    const hasOcrAvailable = (subscription.data?.ocrPagesTotalAvailable ?? 0) > 0
    const isOcrSupportedType = props.file.type === "application/pdf" || (props.file.type?.startsWith("image/") ?? false)

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

    async function handleOcr() {
        setOcrLoading(true)
        const ocrResponse = await getResponseBodyFromAPI({
            routeDefinition: ocrFileRouteDefinition,
            body: {
                idFile: props.file.id,
            },
            hasToastMessage: true,
        })
        setOcrLoading(false)

        if (ocrResponse.ok === false) {
            return
        }

        await invalidateData({
            routeDefinition: readAllFilesRouteDefinition,
            body: {},
        })

        toast({
            title: "Fichier converti en Markdown",
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
                            onClick={() =>
                                openTab({
                                    component: "fichier",
                                    props: {
                                        idOrganization: props.idOrganization,
                                        idFile: props.file.id,
                                    },
                                })
                            }
                            className={css({
                                width: "100%",
                            })}
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
                            <ButtonGhostContent
                                leftIcon={<IconPencil />}
                                text="Modifier"
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
                            onClick={() =>
                                openModal(
                                    moveModalId,
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
                                                onSuccess={() => closeModal(moveModalId)}
                                            />
                                        </Dialog.Body>
                                    </Dialog.Content>,
                                )
                            }
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
                    {props.file.storageKey && isOcrSupportedType && (
                        <div
                            className={css({
                                position: "relative",
                            })}
                            onPointerEnter={() => {
                                if (!hasOcrAvailable) {
                                    setOcrTooltipOpen(true)
                                }
                            }}
                            onPointerLeave={() => setOcrTooltipOpen(false)}
                        >
                            <Popover.Close asChild>
                                <Button
                                    className={css({
                                        width: "100%",
                                    })}
                                    onClick={hasOcrAvailable && !ocrLoading ? handleOcr : undefined}
                                    isDisabled={!hasOcrAvailable || ocrLoading}
                                >
                                    <ButtonGhostContent
                                        leftIcon={<IconFileText />}
                                        text={ocrLoading ? "Extraction..." : "Extraire le texte (OCR)"}
                                        isDisabled={!hasOcrAvailable}
                                        className={css({
                                            width: "100%",
                                            justifyContent: "start",
                                            ...(!hasOcrAvailable && {
                                                textDecoration: "line-through",
                                            }),
                                        })}
                                    />
                                </Button>
                            </Popover.Close>
                            {!hasOcrAvailable && ocrTooltipOpen && (
                                <div
                                    className={css({
                                        position: "absolute",
                                        bottom: "calc(100% + 0.5rem)",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        zIndex: "50",
                                        backgroundColor: "neutral",
                                        color: "white",
                                        borderRadius: "md",
                                        paddingX: "0.5rem",
                                        paddingY: "0.375rem",
                                        fontSize: "xs",
                                        whiteSpace: "nowrap",
                                        pointerEvents: "none",
                                        boxShadow: "md",
                                    })}
                                >
                                    Aucune page OCR disponible
                                </div>
                            )}
                        </div>
                    )}
                    <Separator />
                    <Popover.Close asChild>
                        <Button
                            className={css({
                                width: "100%",
                            })}
                            onClick={() =>
                                openModal(
                                    deleteModalId,
                                    <Dialog.Content>
                                        <Dialog.Header>
                                            <Dialog.Title>Voulez-vous supprimer ce fichier ?</Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <Dialog.Description>
                                                Cette action supprimera le fichier et toutes les données associées.
                                                Cette action est irréversible.
                                            </Dialog.Description>
                                        </Dialog.Body>
                                        <Dialog.Footer>
                                            <Button onClick={() => closeModal(deleteModalId)}>
                                                <ButtonOutlineContent text="Annuler" />
                                            </Button>
                                            <Button hasLoader onClick={async () => { await handleDelete(); closeModal(deleteModalId) }}>
                                                <ButtonPlainContent color="danger" text="Supprimer le fichier" />
                                            </Button>
                                        </Dialog.Footer>
                                    </Dialog.Content>,
                                )
                            }
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
        </>
    )
}
