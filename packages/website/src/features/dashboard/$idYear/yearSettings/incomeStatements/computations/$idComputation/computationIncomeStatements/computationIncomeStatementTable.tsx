import {
    readAllComputationIncomeStatementsRouteDefinition,
    readOneIncomeStatementRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonGhostContent } from "@arrhes/ui"
import { IconEye } from "@tabler/icons-react"
import type * as v from "valibot"
import { FormatDateTime } from "../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../../../components/formats/formatText.tsx"
import { Chip } from "../../../../../../../../components/layouts/chip.tsx"
import { DataTable } from "../../../../../../../../components/layouts/dataTable.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { LinkButton } from "../../../../../../../../components/linkButton.tsx"

export function ComputationIncomeStatementsTable(props: {
    computation: v.InferOutput<typeof returnedSchemas.computation>
}) {
    return (
        <DataWrapper
            routeDefinition={readAllComputationIncomeStatementsRouteDefinition}
            body={{
                idComputation: props.computation.id,
                idYear: props.computation.idYear,
            }}
        >
            {(computationIncomeStatements) => {
                return (
                    <DataTable
                        data={computationIncomeStatements}
                        isLoading={false}
                        columns={[
                            {
                                accessorKey: "actions",
                                header: " ",
                                cell: ({ row }) => (
                                    <LinkButton
                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat/calculs/$idComputation/$idComputationIncomeStatement"
                                        params={{
                                            idOrganization: row.original.idOrganization,
                                            idYear: row.original.idYear,
                                            idComputation: row.original.idComputation,
                                            idComputationIncomeStatement: row.original.id,
                                        }}
                                    >
                                        <ButtonGhostContent leftIcon={<IconEye />} text={undefined} />
                                    </LinkButton>
                                ),
                                enableSorting: false,
                                enableGlobalFilter: false,
                            },
                            {
                                accessorKey: "idStatement",
                                header: "Poste du compte de résultat",
                                cell: ({ row }) => (
                                    <DataWrapper
                                        routeDefinition={readOneIncomeStatementRouteDefinition}
                                        body={{
                                            idYear: row.original.idYear,
                                            idIncomeStatement: row.original.idIncomeStatement,
                                        }}
                                    >
                                        {(incomeStatement) => (
                                            <FormatText>
                                                {`${incomeStatement.number} - ${incomeStatement.label}`}
                                            </FormatText>
                                        )}
                                    </DataWrapper>
                                ),
                                filterFn: "includesString",
                            },
                            {
                                accessorKey: "operation",
                                header: "Opération",
                                cell: ({ row }) => (
                                    <Chip text={row.original.operation === "plus" ? "Addition" : "Soustraction"} />
                                ),
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
            }}
        </DataWrapper>
    )
}
