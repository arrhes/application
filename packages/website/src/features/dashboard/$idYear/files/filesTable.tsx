import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft, IconFile, IconFileTypePdf, IconFolder } from "@tabler/icons-react"
import type { ReactElement } from "react"
import type * as v from "valibot"
import { FormatDateTime } from "../../../../components/formats/formatDateTime.js"
import { FormatFileSize } from "../../../../components/formats/formatFileSize.js"
import { FormatNull } from "../../../../components/formats/formatNull.js"
import { DataTable } from "../../../../components/layouts/dataTable.js"
import { LinkButton } from "../../../../components/linkButton.js"
import { FileActions } from "./fileActions.js"
import { FolderActions } from "./folderActions.js"

type TableRow =
    | { kind: "back" }
    | { kind: "folder"; data: v.InferOutput<typeof returnedSchemas.folder> }
    | { kind: "file"; data: v.InferOutput<typeof returnedSchemas.file> }

export function FilesTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    files: Array<v.InferOutput<typeof returnedSchemas.file>>
    folders: Array<v.InferOutput<typeof returnedSchemas.folder>>
    currentFolderId: string | null
    parentFolderId: string | null
    onFolderOpen: (folderId: string | null) => void
    hasActiveFilters?: boolean
}) {
    const rows: Array<TableRow> = [
        ...(props.currentFolderId !== null ? [{ kind: "back" as const }] : []),
        ...props.folders.map((folder) => ({ kind: "folder" as const, data: folder })),
        ...props.files.map((file) => ({ kind: "file" as const, data: file })),
    ]

    const icons: Record<string, ReactElement> = {
        "application/pdf": <IconFileTypePdf />,
    }

    return (
        <DataTable
            data={rows}
            isLoading={false}
            hideSearchBar
            columns={[
                {
                    accessorKey: "name",
                    header: "Nom",
                    cell: ({ row }) => {
                        const item = row.original
                        if (item.kind === "back") {
                            return (
                                <Button onClick={() => props.onFolderOpen(props.parentFolderId)}>
                                    <ButtonGhostContent leftIcon={<IconArrowLeft />} text=".." />
                                </Button>
                            )
                        }
                        if (item.kind === "folder") {
                            return (
                                <Button onClick={() => props.onFolderOpen(item.data.id)}>
                                    <ButtonGhostContent leftIcon={<IconFolder />} text={item.data.name} />
                                </Button>
                            )
                        }
                        if (item.kind === "file") {
                            const leftIcon = item.data.type !== null ? icons[item.data.type] : undefined
                            return (
                                <LinkButton
                                    to="/dashboard/organisations/$idOrganization/exercices/$idYear/stockage/$idFile"
                                    params={{
                                        idFile: item.data.id,
                                    }}
                                >
                                    <ButtonGhostContent
                                        leftIcon={leftIcon ?? <IconFile />}
                                        text={item.data.name ?? "/"}
                                    />
                                </LinkButton>
                            )
                        }
                    },
                    filterFn: "includesString",
                },
                {
                    accessorKey: "size",
                    header: "Size",
                    cell: ({ row }) => {
                        const item = row.original
                        if (item.kind === "back") {
                            return <FormatNull />
                        }
                        if (item.kind === "folder") {
                            return <FormatNull />
                        }
                        if (item.kind === "file") {
                            return <FormatFileSize size={item.data.size} />
                        }
                    },
                    filterFn: "includesString",
                },
                {
                    accessorKey: "createdAt",
                    header: "Date",
                    cell: ({ row }) => {
                        const item = row.original
                        if (item.kind === "back") return <span className={css({ color: "neutral/40" })}>--</span>
                        return <FormatDateTime date={item.data.createdAt} />
                    },
                    filterFn: "includesString",
                },
                {
                    accessorKey: "actions",
                    header: " ",
                    cell: ({ row }) => {
                        const item = row.original
                        if (item.kind === "back") return null
                        if (item.kind === "folder") {
                            return (
                                <FolderActions
                                    folder={item.data}
                                    idOrganization={props.idOrganization}
                                    idYear={props.idYear}
                                    onFolderOpen={props.onFolderOpen}
                                />
                            )
                        }
                        return (
                            <FileActions file={item.data} idOrganization={props.idOrganization} idYear={props.idYear} />
                        )
                    },
                    enableSorting: false,
                    enableGlobalFilter: false,
                },
            ]}
        />
    )
}
