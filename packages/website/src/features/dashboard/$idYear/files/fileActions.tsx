import {
    deleteOneFileRouteDefinition,
    ocrFileRouteDefinition,
    readAllFilesRouteDefinition,
    readOrganizationSubscriptionRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonGhostContent, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/css"
import { IconDotsVertical, IconEye, IconFileText, IconPencil, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { Dropdown } from "../../../../components/layouts/dropdownMenu/dropdown.js"
import { LinkButton } from "../../../../components/linkButton.js"
import { DeleteConfirmation } from "../../../../components/overlays/dialog/deleteConfirmation.js"
import { Drawer } from "../../../../components/overlays/drawer/drawer.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.ts"
import { UpdateOneFileForm } from "./$idFile/updateOneFileForm.js"

export function FileActions(props: {
    file: v.InferOutput<typeof returnedSchemas.file>
    idOrganization: string
    idYear: string
}) {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [ocrLoading, setOcrLoading] = useState(false)
    const [ocrTooltipOpen, setOcrTooltipOpen] = useState(false)

    const subscription = useDataFromAPI({
        routeDefinition: readOrganizationSubscriptionRouteDefinition,
        body: {},
    })
    const isPremium = subscription.data?.isPremium === true
    const isOcrSupportedType =
        props.file.type === "application/pdf" || (props.file.type?.startsWith("image/") ?? false)

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

    async function handleOcr() {
        setOcrLoading(true)
        const ocrResponse = await getResponseBodyFromAPI({
            routeDefinition: ocrFileRouteDefinition,
            body: {
                idFile: props.file.id,
                idYear: props.idYear,
            },
            hasToastMessage: true,
        })
        setOcrLoading(false)

        if (ocrResponse.ok === false) {
            return
        }

        await invalidateData({
            routeDefinition: readAllFilesRouteDefinition,
            body: {
                idYear: props.idYear,
            },
        })

        toast({ title: "Fichier converti en Markdown", variant: "success" })
    }

    return (
        <>
            <Dropdown.Root>
                <Dropdown.Trigger>
                    <ButtonGhostContent leftIcon={<IconDotsVertical size={16} />} text={undefined} />
                </Dropdown.Trigger>
                <Dropdown.Content align="end">
                    <Dropdown.Item asChild>
                        <LinkButton
                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/stockage/$idFile"
                            params={{
                                idOrganization: props.idOrganization,
                                idYear: props.idYear,
                                idFile: props.file.id,
                            }}
                        >
                            <ButtonGhostContent
                                leftIcon={<IconEye />}
                                text="Voir"
                                className={css({ width: "100%", justifyContent: "start" })}
                            />
                        </LinkButton>
                    </Dropdown.Item>
                    <Dropdown.Item onSelect={() => setEditOpen(true)}>
                        <ButtonGhostContent
                            leftIcon={<IconPencil />}
                            text="Modifier"
                            className={css({ width: "100%", justifyContent: "start" })}
                        />
                    </Dropdown.Item>
                    {props.file.storageKey && isOcrSupportedType && (
                        <div
                            className={css({ position: "relative" })}
                            onPointerEnter={() => {
                                if (!isPremium) {
                                    setOcrTooltipOpen(true)
                                }
                            }}
                            onPointerLeave={() => setOcrTooltipOpen(false)}
                        >
                            <Dropdown.Item
                                onSelect={isPremium ? handleOcr : undefined}
                                disabled={!isPremium || ocrLoading}
                            >
                                <ButtonGhostContent
                                    leftIcon={<IconFileText />}
                                    text={ocrLoading ? "Extraction..." : "Extraire le texte (OCR)"}
                                    isDisabled={!isPremium}
                                    className={css({
                                        width: "100%",
                                        justifyContent: "start",
                                        ...(!isPremium && {
                                            textDecoration: "line-through",
                                        }),
                                    })}
                                />
                            </Dropdown.Item>
                            {!isPremium && ocrTooltipOpen && (
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
                                    Fonctionnalité réservée aux abonnements premium
                                </div>
                            )}
                        </div>
                    )}
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
                    <Drawer.Header title="Modifier le fichier" />
                    <Drawer.Body>
                        <UpdateOneFileForm file={props.file} onSuccess={() => setEditOpen(false)} />
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>

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
