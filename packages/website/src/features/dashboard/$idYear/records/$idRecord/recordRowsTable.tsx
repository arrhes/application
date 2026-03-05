import type { readAllAccountsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconEye, IconPencil } from "@tabler/icons-react"
import type * as v from "valibot"
import { FormatDateTime } from "../../../../../components/formats/formatDateTime.tsx"
import { FormatNull } from "../../../../../components/formats/formatNull.tsx"
import { FormatPrice } from "../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../components/formats/formatText.tsx"
import { DataTable } from "../../../../../components/layouts/dataTable.tsx"
import { LinkButton } from "../../../../../components/linkButton.tsx"
import { UpdateOneRecordRow } from "./$idRecordRow/updateOneRecordRow.tsx"

export function RecordRowsTable(props: {
    record: v.InferOutput<typeof returnedSchemas.record>
    recordRows: Array<v.InferOutput<typeof returnedSchemas.recordRow>>
    accounts: Map<string, v.InferOutput<typeof readAllAccountsRouteDefinition.schemas.return>[number]>
    isLoading?: boolean
}) {
    return (
        <DataTable
            data={props.recordRows}
            isLoading={false}
            columns={[
                {
                    accessorKey: "actions",
                    header: " ",
                    cell: ({ row }) => (
                        <div className={css({ display: "flex", justifyContent: "center", alignItems: "center" })}>
                            <UpdateOneRecordRow recordRow={row.original}>
                                <ButtonGhostContent leftIcon={<IconPencil />} text={undefined} />
                            </UpdateOneRecordRow>
                            <LinkButton
                                to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord/$idRecordRow"
                                params={{
                                    idOrganization: props.record.idOrganization,
                                    idYear: props.record.idYear,
                                    idRecord: row.original.idRecord,
                                    idRecordRow: row.original.id,
                                }}
                            >
                                <ButtonGhostContent leftIcon={<IconEye />} text={undefined} />
                            </LinkButton>
                        </div>
                    ),
                    enableSorting: false,
                    enableGlobalFilter: false,
                },
                {
                    accessorKey: "label",
                    header: "Libellé",
                    cell: ({ row }) => <FormatText>{row.original.label}</FormatText>,
                    filterFn: "includesString",
                },
                {
                    accessorKey: "idAccount",
                    header: "Compte",
                    cell: ({ row }) => {
                        const account = props.accounts.get(row.original.idAccount)
                        if (!account) return <FormatNull />
                        return (
                            <div
                                className={css({
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    gap: "0.5rem",
                                })}
                            >
                                <FormatText className={css({ overflow: "visible" })}>{account.number}</FormatText>
                                <FormatText wrap={true} className={css({ color: "neutral/50" })}>
                                    {account.label}
                                </FormatText>
                            </div>
                        )
                    },
                    filterFn: "includesString",
                },
                {
                    accessorKey: "debit",
                    header: "Débit",
                    cell: ({ row }) => <FormatPrice price={row.original.debit} />,
                    filterFn: "includesString",
                },
                {
                    accessorKey: "credit",
                    header: "Crédit",
                    cell: ({ row }) => <FormatPrice price={row.original.credit} />,
                    filterFn: "includesString",
                },
                {
                    accessorKey: "createdAt",
                    header: "Ajouté le",
                    cell: ({ row }) => <FormatDateTime date={row.original.createdAt} />,
                    filterFn: "includesString",
                },
            ]}
        />
    )
}
