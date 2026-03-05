import { deleteOneFileRouteDefinition, readAllFilesRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/css"
import { IconDotsVertical, IconEye, IconPencil } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { Dropdown } from "../../../../components/layouts/dropdownMenu/dropdown.js"
import { LinkButton } from "../../../../components/linkButton.js"
import { DeleteConfirmation } from "../../../../components/overlays/dialog/deleteConfirmation.js"
import { Drawer } from "../../../../components/overlays/drawer/drawer.js"
import { toast } from "../../../../contexts/toasts/useToast.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { UpdateOneFileForm } from "./$idFile/updateOneFileForm.js"

export function FileActions(props: {
    file: v.InferOutput<typeof returnedSchemas.file>
    idOrganization: string
    idYear: string
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
                    <Dropdown.Separator />
                    <Dropdown.Item onSelect={() => setDeleteOpen(true)}>
                        <ButtonGhostContent
                            leftIcon={<IconPencil />}
                            text="IconTrash"
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
