import type { returnedSchemas } from "@arrhes/application-metadata"
import {
    deleteOneFolderRouteDefinition,
    readAllFilesRouteDefinition,
    readAllFoldersRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronDown, IconTrash } from "@tabler/icons-react"
import type { Row } from "@tanstack/react-table"
import { useState } from "react"
import type * as v from "valibot"
import { ConfirmationModal } from "../../../../components/overlays/dialog/confirmationModal.js"
import { Popover } from "../../../../components/overlays/popover/popover.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { deleteFileWithSignedUrl } from "./deleteFileWithSignedUrl.js"

export type TableRow =
    | { kind: "back" }
    | { kind: "folder"; data: v.InferOutput<typeof returnedSchemas.folder> }
    | { kind: "file"; data: v.InferOutput<typeof returnedSchemas.file> }

export function FilesTableSelectionActions(props: { selectedRows: Array<Row<TableRow>>; idYear: string }) {
    const [deleteOpen, setDeleteOpen] = useState(false)
    const selectedFiles = props.selectedRows
        .filter((r) => r.original.kind === "file")
        .map((r) => (r.original as Extract<TableRow, { kind: "file" }>).data)
    const selectedFolders = props.selectedRows
        .filter((r) => r.original.kind === "folder")
        .map((r) => (r.original as Extract<TableRow, { kind: "folder" }>).data)

    async function handleDelete() {
        const results = await Promise.all([
            ...selectedFiles.map((file) =>
                deleteFileWithSignedUrl({
                    idFile: file.id,
                    idYear: props.idYear,
                }).then((ok) => ({ ok })),
            ),
            ...selectedFolders.map((folder) =>
                getResponseBodyFromAPI({
                    routeDefinition: deleteOneFolderRouteDefinition,
                    body: { idFolder: folder.id, idYear: props.idYear },
                }),
            ),
        ])
        await Promise.all([
            invalidateData({ routeDefinition: readAllFilesRouteDefinition, body: { idYear: props.idYear } }),
            invalidateData({ routeDefinition: readAllFoldersRouteDefinition, body: { idYear: props.idYear } }),
        ])
        if (results.some((r) => r.ok === false)) {
            toast({ title: "Certains éléments n'ont pas pu être supprimés", variant: "error" })
        } else {
            toast({ title: "Éléments supprimés", variant: "success" })
        }
    }

    return (
        <>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <Button>
                        <ButtonGhostContent leftIcon={<IconChevronDown />} text={undefined} />
                    </Button>
                </Popover.Trigger>
                <Popover.Content align="start" className={css({ padding: "0.5rem", gap: "0.25rem" })}>
                    <Popover.Close asChild>
                        <Button className={css({ width: "100%" })} onClick={() => setDeleteOpen(true)}>
                            <ButtonGhostContent
                                leftIcon={<IconTrash />}
                                text="Supprimer"
                                color="danger"
                                className={css({ width: "100%", justifyContent: "start" })}
                            />
                        </Button>
                    </Popover.Close>
                </Popover.Content>
            </Popover.Root>
            <ConfirmationModal
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="Supprimer les éléments sélectionnés"
                description={`Voulez-vous supprimer ${props.selectedRows.length} élément${
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
