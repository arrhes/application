import { deleteOneEntryRouteDefinition, readAllEntriesRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronDown, IconTrash } from "@tabler/icons-react"
import type { Row } from "@tanstack/react-table"
import { useState } from "react"
import type * as v from "valibot"
import { Dropdown } from "../../../../components/layouts/dropdownMenu/dropdown.js"
import { ConfirmationModal } from "../../../../components/overlays/dialog/confirmationModal.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"

type EntryRow = v.InferOutput<typeof readAllEntriesRouteDefinition.schemas.return>[number]

export function EntriesTableSelectionActions(props: { selectedRows: Array<Row<EntryRow>>; idYear: string }) {
    const [deleteOpen, setDeleteOpen] = useState(false)

    async function handleDelete() {
        const results = await Promise.all(
            props.selectedRows.map((row) =>
                getResponseBodyFromAPI({
                    routeDefinition: deleteOneEntryRouteDefinition,
                    body: { idEntry: row.original.id, idYear: props.idYear },
                }),
            ),
        )
        await invalidateData({ routeDefinition: readAllEntriesRouteDefinition, body: { idYear: props.idYear } })
        if (results.some((r) => r.ok === false)) {
            toast({ title: "Certaines écritures n'ont pas pu être supprimées", variant: "error" })
        } else {
            toast({ title: "Écritures supprimées", variant: "success" })
        }
    }

    return (
        <>
            <Dropdown.Root>
                <Dropdown.Trigger>
                    <ButtonGhostContent leftIcon={<IconChevronDown />} text={undefined} />
                </Dropdown.Trigger>
                <Dropdown.Content align="start">
                    <Dropdown.Item onSelect={() => setDeleteOpen(true)}>
                        <Button>
                            <ButtonGhostContent
                                leftIcon={<IconTrash />}
                                text="Supprimer"
                                color="danger"
                                className={css({ width: "100%", justifyContent: "start" })}
                            />
                        </Button>
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown.Root>
            <ConfirmationModal
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="Supprimer les écritures sélectionnées"
                description={`Voulez-vous supprimer ${props.selectedRows.length} écriture${
                    props.selectedRows.length > 1 ? "s" : ""
                } ? Cette action est irréversible.`}
                submitButtonProps={{
                    text: "Supprimer",
                    leftIcon: <IconTrash />,
                    color: "danger",
                }}
                onSubmit={handleDelete}
            />
        </>
    )
}
