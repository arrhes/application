import type {
    readAllAccountsRouteDefinition,
    readAllEntriesRouteDefinition,
    readAllEntryLinesRouteDefinition,
    readAllEntryTagsRouteDefinition,
    readAllFilesRouteDefinition,
    readAllJournalsRouteDefinition,
    readAllTagsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { FormatDate, FormatDateTime, FormatNull, FormatPrice, FormatText, LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil } from "@tabler/icons-react"
import { useMemo } from "react"
import type * as v from "valibot"
import { DataTable } from "../../../../components/layouts/dataTable.js"
import { LinkButton } from "../../../../components/linkButton.js"
import { EntriesTableSelectionActions } from "./entriesTableSelectionActions.js"

export function EntriesTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    entries: v.InferOutput<typeof readAllEntriesRouteDefinition.schemas.return>
    entryLines: v.InferOutput<typeof readAllEntryLinesRouteDefinition.schemas.return>
    entryTags: v.InferOutput<typeof readAllEntryTagsRouteDefinition.schemas.return>
    journals: v.InferOutput<typeof readAllJournalsRouteDefinition.schemas.return>
    tags: v.InferOutput<typeof readAllTagsRouteDefinition.schemas.return>
    files: v.InferOutput<typeof readAllFilesRouteDefinition.schemas.return>
    accounts: v.InferOutput<typeof readAllAccountsRouteDefinition.schemas.return>
}) {
    const entriesData = useMemo(
        () =>
            [
                ...props.entries,
            ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        [
            props.entries,
        ],
    )

    const linesByEntry = useMemo(() => {
        const map = new Map<string, typeof props.entryLines>()
        for (const row of props.entryLines) {
            const existing = map.get(row.idEntry)
            if (existing) {
                existing.push(row)
            } else {
                map.set(row.idEntry, [
                    row,
                ])
            }
        }
        return map
    }, [
        props.entryLines,
    ])

    const journalsMap = useMemo(() => {
        const map = new Map<string, (typeof props.journals)[number]>()
        for (const journal of props.journals) {
            map.set(journal.id, journal)
        }
        return map
    }, [
        props.journals,
    ])

    const tagsMap = useMemo(() => {
        const map = new Map<string, (typeof props.tags)[number]>()
        for (const tag of props.tags) {
            map.set(tag.id, tag)
        }
        return map
    }, [
        props.tags,
    ])

    const tagsByEntry = useMemo(() => {
        const map = new Map<string, string[]>()
        for (const entryTag of props.entryTags) {
            const existing = map.get(entryTag.idEntry)
            if (existing) {
                existing.push(entryTag.idTag)
            } else {
                map.set(entryTag.idEntry, [
                    entryTag.idTag,
                ])
            }
        }
        return map
    }, [
        props.entryTags,
    ])

    const filesMap = useMemo(() => {
        const map = new Map<string, (typeof props.files)[number]>()
        for (const file of props.files) {
            map.set(file.id, file)
        }
        return map
    }, [
        props.files,
    ])

    const accountsMap = useMemo(() => {
        const map = new Map<string, (typeof props.accounts)[number]>()
        for (const account of props.accounts) {
            map.set(account.id, account)
        }
        return map
    }, [
        props.accounts,
    ])

    return (
        <DataTable
            data={entriesData}
            isLoading={false}
            enableRowSelection={true}
            getRowId={(row) => row.id}
            selectionActions={(selectedRows) => (
                <EntriesTableSelectionActions
                    selectedRows={selectedRows}
                    idYear={props.idYear}
                />
            )}
            emptyStateProps={{
                icon: <IconPencil />,
                title: "Aucune écriture",
                subtitle: "Les écritures de votre exercice apparaîtront ici.",
            }}
            columns={[
                {
                    accessorKey: "label",
                    header: "Libellé",
                    cell: ({ row }) => (
                        <LinkButton
                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry"
                            params={{
                                idOrganization: row.original.idOrganization,
                                idYear: row.original.idYear,
                                idEntry: row.original.id,
                            }}
                        >
                            <LinkContent>{row.original.label}</LinkContent>
                        </LinkButton>
                    ),
                    filterFn: "includesString",
                },
                {
                    accessorKey: "date",
                    header: "Date",
                    cell: ({ row }) => <FormatDate date={row.original.date} />,
                    filterFn: "includesString",
                },
                {
                    accessorKey: "idJournal",
                    header: "Journal",
                    cell: ({ row }) => {
                        if (row.original.idJournal === null) return <FormatNull />
                        const journal = journalsMap.get(row.original.idJournal)
                        if (!journal) return <FormatNull />
                        return <FormatText>{journal.code}</FormatText>
                    },
                    filterFn: "includesString",
                },
                {
                    accessorKey: "id",
                    id: "tags",
                    header: "Catégorie",
                    cell: ({ row }) => {
                        const tagIds = tagsByEntry.get(row.original.id)
                        if (!tagIds || tagIds.length === 0) return <FormatNull />
                        const tagLabels = tagIds
                            .map((id) => tagsMap.get(id))
                            .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag))
                            .map((tag) => tag.label)
                        if (tagLabels.length === 0) return <FormatNull />
                        return <FormatText>{tagLabels.join(", ")}</FormatText>
                    },
                    filterFn: "includesString",
                },
                {
                    accessorKey: "idFile",
                    header: "Pièce justificative",
                    cell: ({ row }) => {
                        if (row.original.idFile === null) return <FormatNull />
                        const file = filesMap.get(row.original.idFile)
                        if (!file) return <FormatNull />
                        return (
                            <LinkButton
                                to="/dashboard/organisations/$idOrganization/stockage/$idFile"
                                params={{
                                    idOrganization: props.idOrganization,
                                    idFile: file.id,
                                }}
                            >
                                <LinkContent>{file.name}</LinkContent>
                            </LinkButton>
                        )
                    },
                    filterFn: "includesString",
                },
                {
                    accessorKey: "createdAt",
                    header: "Ajouté le",
                    cell: ({ row }) => <FormatDateTime date={row.original.createdAt} />,
                    filterFn: "includesString",
                },
                {
                    accessorKey: "lastUpdatedAt",
                    header: "Dernière mise à jour le",
                    cell: ({ row }) => <FormatDateTime date={row.original.lastUpdatedAt} />,
                    filterFn: "includesString",
                },
            ]}
            renderSubComponent={({ row }) => {
                const rows = linesByEntry.get(row.original.id)
                if (!rows || rows.length === 0) {
                    return (
                        <FormatNull
                            text="Aucun mouvement"
                            className={css({
                                padding: "1rem",
                            })}
                        />
                    )
                }
                return (
                    <table
                        className={css({
                            width: "100%",
                            borderCollapse: "collapse",
                        })}
                    >
                        <thead>
                            <tr>
                                <th
                                    className={css({
                                        padding: "0.5rem 1rem",
                                        fontSize: "xs",
                                        fontWeight: "semibold",
                                        color: "neutral/40",
                                        textAlign: "left",
                                    })}
                                >
                                    Compte
                                </th>
                                <th
                                    className={css({
                                        padding: "0.5rem 1rem",
                                        fontSize: "xs",
                                        fontWeight: "semibold",
                                        color: "neutral/40",
                                        textAlign: "left",
                                    })}
                                >
                                    Libellé
                                </th>
                                <th
                                    className={css({
                                        padding: "0.5rem 1rem",
                                        fontSize: "xs",
                                        fontWeight: "semibold",
                                        color: "neutral/40",
                                        textAlign: "right",
                                    })}
                                >
                                    Débit
                                </th>
                                <th
                                    className={css({
                                        padding: "0.5rem 1rem",
                                        fontSize: "xs",
                                        fontWeight: "semibold",
                                        color: "neutral/40",
                                        textAlign: "right",
                                    })}
                                >
                                    Crédit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((entryLine) => {
                                const account = accountsMap.get(entryLine.idAccount)
                                return (
                                    <tr
                                        key={entryLine.id}
                                        className={css({
                                            borderTop: "1px solid",
                                            borderTopColor: "neutral/5",
                                        })}
                                    >
                                        <td
                                            className={css({
                                                padding: "0.5rem 1rem",
                                            })}
                                        >
                                            {account ? (
                                                <div
                                                    className={css({
                                                        display: "flex",
                                                        justifyContent: "flex-start",
                                                        alignItems: "center",
                                                        gap: "0.5rem",
                                                    })}
                                                >
                                                    <FormatText
                                                        className={css({
                                                            overflow: "visible",
                                                        })}
                                                    >
                                                        {account.number}
                                                    </FormatText>
                                                    <FormatText
                                                        wrap={true}
                                                        className={css({
                                                            color: "neutral/50",
                                                        })}
                                                    >
                                                        {account.label}
                                                    </FormatText>
                                                </div>
                                            ) : (
                                                <FormatNull />
                                            )}
                                        </td>
                                        <td
                                            className={css({
                                                padding: "0.5rem 1rem",
                                            })}
                                        >
                                            <FormatText>{entryLine.label}</FormatText>
                                        </td>
                                        <td
                                            className={css({
                                                padding: "0.5rem 1rem",
                                                textAlign: "right",
                                            })}
                                        >
                                            <FormatPrice price={entryLine.debit} />
                                        </td>
                                        <td
                                            className={css({
                                                padding: "0.5rem 1rem",
                                                textAlign: "right",
                                            })}
                                        >
                                            <FormatPrice price={entryLine.credit} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )
            }}
        />
    )
}
