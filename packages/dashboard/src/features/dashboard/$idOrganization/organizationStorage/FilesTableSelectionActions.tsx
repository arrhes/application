import type { returnedSchemas } from "@arrhes/application-metadata"
import {
    deleteOneFolderRouteDefinition,
    readAllFilesRouteDefinition,
    readAllFoldersRouteDefinition,
} from "@arrhes/application-metadata/routes"
import {
    Button,
    ButtonGhostContent,
    ButtonOutlineContent,
    ButtonPlainContent,
    Dialog,
    toast,
    useModalStore,
} from "@arrhes/ui"
import { IconChevronDown, IconTrash } from "@tabler/icons-react"
import type { Row } from "@tanstack/react-table"
import { useId } from "react"
import type * as v from "valibot"
import { Popover } from "../../../../components/overlays/popover/popover.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { deleteFileWithSignedUrl } from "./deleteFileWithSignedUrl.js"

export type TableRow =
    | {
          kind: "back"
      }
    | {
          kind: "folder"
          data: v.InferOutput<typeof returnedSchemas.folder>
      }
    | {
          kind: "file"
          data: v.InferOutput<typeof returnedSchemas.file>
      }

export function FilesTableSelectionActions(props: { selectedRows: Array<Row<TableRow>> }) {
    const deleteModalId = useId()
    const { open: openModal, close: closeModal } = useModalStore()
    const selectedFiles = props.selectedRows
        .filter((r) => r.original.kind === "file")
        .map(
            (r) =>
                (
                    r.original as Extract<
                        TableRow,
                        {
                            kind: "file"
                        }
                    >
                ).data,
        )
    const selectedFolders = props.selectedRows
        .filter((r) => r.original.kind === "folder")
        .map(
            (r) =>
                (
                    r.original as Extract<
                        TableRow,
                        {
                            kind: "folder"
                        }
                    >
                ).data,
        )

    async function handleDelete() {
        const results = await Promise.all([
            ...selectedFiles.map((file) =>
                deleteFileWithSignedUrl({
                    idFile: file.id,
                }).then((ok) => ({
                    ok,
                })),
            ),
            ...selectedFolders.map((folder) =>
                getResponseBodyFromAPI({
                    routeDefinition: deleteOneFolderRouteDefinition,
                    body: {
                        idFolder: folder.id,
                    },
                }),
            ),
        ])
        await Promise.all([
            invalidateData({
                routeDefinition: readAllFilesRouteDefinition,
                body: {},
            }),
            invalidateData({
                routeDefinition: readAllFoldersRouteDefinition,
                body: {},
            }),
        ])
        if (results.some((r) => r.ok === false)) {
            toast({
                title: "Certains éléments n'ont pas pu être supprimés",
                variant: "error",
            })
        } else {
            toast({
                title: "Éléments supprimés",
                variant: "success",
            })
        }
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button>
                    <ButtonGhostContent
                        leftIcon={<IconChevronDown />}
                        text={undefined}
                    />
                </Button>
            </Popover.Trigger>
            <Popover.Content
                align="start"
                className={{
                    padding: "0.5rem",
                    gap: "0.25rem",
                }}
            >
                <Popover.Close asChild>
                    <Button
                        className={{
                            width: "100%",
                        }}
                        onClick={() =>
                            openModal(
                                deleteModalId,
                                <Dialog.Content>
                                    <Dialog.Header>
                                        <Dialog.Title>Supprimer les éléments sélectionnés</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <Dialog.Description>
                                            {`Voulez-vous supprimer ${props.selectedRows.length} élément${
                                                props.selectedRows.length > 1 ? "s" : ""
                                            } ? Cette action est irréversible.`}
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
                                                leftIcon={<IconTrash />}
                                                text="Supprimer"
                                            />
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
                            className={{
                                width: "100%",
                                justifyContent: "start",
                            }}
                        />
                    </Button>
                </Popover.Close>
            </Popover.Content>
        </Popover.Root>
    )
}
