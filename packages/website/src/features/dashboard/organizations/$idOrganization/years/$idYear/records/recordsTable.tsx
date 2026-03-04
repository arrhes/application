import type {
    readAllAccountsRouteDefinition,
    readAllFilesRouteDefinition,
    readAllJournalsRouteDefinition,
    readAllRecordLabelsRouteDefinition,
    readAllRecordRowsRouteDefinition,
    readAllRecordsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useMemo } from "react"
import type * as v from "valibot"
import { FormatDate } from "../../../../../../../components/formats/formatDate.js"
import { FormatDateTime } from "../../../../../../../components/formats/formatDateTime.js"
import { FormatNull } from "../../../../../../../components/formats/formatNull.js"
import { FormatPrice } from "../../../../../../../components/formats/formatPrice.js"
import { FormatText } from "../../../../../../../components/formats/formatText.js"
import { DataTable } from "../../../../../../../components/layouts/dataTable.js"
import { LinkButton } from "../../../../../../../components/linkButton.js"

export function RecordsTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    records: v.InferOutput<typeof readAllRecordsRouteDefinition.schemas.return>
    recordRows: v.InferOutput<typeof readAllRecordRowsRouteDefinition.schemas.return>
    journals: v.InferOutput<typeof readAllJournalsRouteDefinition.schemas.return>
    recordLabels: v.InferOutput<typeof readAllRecordLabelsRouteDefinition.schemas.return>
    files: v.InferOutput<typeof readAllFilesRouteDefinition.schemas.return>
    accounts: v.InferOutput<typeof readAllAccountsRouteDefinition.schemas.return>
}) {
    const recordsData = useMemo(
        () => [...props.records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        [props.records],
    )

    const rowsByRecord = useMemo(() => {
        const map = new Map<string, typeof props.recordRows>()
        for (const row of props.recordRows) {
            const existing = map.get(row.idRecord)
            if (existing) {
                existing.push(row)
            } else {
                map.set(row.idRecord, [row])
            }
        }
        return map
    }, [props.recordRows])

    const journalsMap = useMemo(() => {
        const map = new Map<string, (typeof props.journals)[number]>()
        for (const journal of props.journals) {
            map.set(journal.id, journal)
        }
        return map
    }, [props.journals])

    const recordLabelsMap = useMemo(() => {
        const map = new Map<string, (typeof props.recordLabels)[number]>()
        for (const recordLabel of props.recordLabels) {
            map.set(recordLabel.id, recordLabel)
        }
        return map
    }, [props.recordLabels])

    const filesMap = useMemo(() => {
        const map = new Map<string, (typeof props.files)[number]>()
        for (const file of props.files) {
            map.set(file.id, file)
        }
        return map
    }, [props.files])

    const accountsMap = useMemo(() => {
        const map = new Map<string, (typeof props.accounts)[number]>()
        for (const account of props.accounts) {
            map.set(account.id, account)
        }
        return map
    }, [props.accounts])

    return (
        <DataTable
            data={recordsData}
            isLoading={false}
            columns={[
                {
                    accessorKey: "label",
                    header: "Libellé",
                    cell: ({ row }) => (
                        <LinkButton
                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord"
                            params={{
                                idOrganization: row.original.idOrganization,
                                idYear: row.original.idYear,
                                idRecord: row.original.id,
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
                    accessorKey: "idRecordLabel",
                    header: "Catégorie",
                    cell: ({ row }) => {
                        if (row.original.idRecordLabel === null) return <FormatNull />
                        const recordLabel = recordLabelsMap.get(row.original.idRecordLabel)
                        if (!recordLabel) return <FormatNull />
                        return <FormatText>{recordLabel.label}</FormatText>
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
                        return <FormatText>{file.reference}</FormatText>
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
                const rows = rowsByRecord.get(row.original.id)
                if (!rows || rows.length === 0) {
                    return <FormatNull text="Aucun mouvement" className={css({ padding: "1rem" })} />
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
                            {rows.map((recordRow) => {
                                const account = accountsMap.get(recordRow.idAccount)
                                return (
                                    <tr
                                        key={recordRow.id}
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
                                            <FormatText>{recordRow.label}</FormatText>
                                        </td>
                                        <td
                                            className={css({
                                                padding: "0.5rem 1rem",
                                                textAlign: "right",
                                            })}
                                        >
                                            <FormatPrice price={recordRow.debit} />
                                        </td>
                                        <td
                                            className={css({
                                                padding: "0.5rem 1rem",
                                                textAlign: "right",
                                            })}
                                        >
                                            <FormatPrice price={recordRow.credit} />
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
