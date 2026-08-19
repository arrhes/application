import { readAllIncomeStatementsRouteDefinition } from "@comptasse/application-metadata/routes"
import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { css } from "@comptasse/ui/utilities/cn.js"
import { IconReportMoney } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../components/layouts/DataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/EmptyState.tsx"
import { getIncomeStatementChildren } from "./getIncomeStatementChildren.tsx"
import { IncomeStatementItem } from "./IncomeStatementItem.tsx"

export function IncomeStatementsTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    globalFilter: string
}) {
    const normalizedGlobalFilter = props.globalFilter.trim().toLowerCase()

    return (
        <DataWrapper
            routeDefinition={readAllIncomeStatementsRouteDefinition}
            body={{
                idYear: props.idYear,
            }}
        >
            {(incomeStatements) => {
                const filteredIncomeStatements = incomeStatements
                    .filter((incomeStatement) => {
                        if (incomeStatement.idIncomeStatementParent !== null) return false
                        if (normalizedGlobalFilter.length === 0) return true

                        return `${incomeStatement.number} ${incomeStatement.label}`
                            .toLowerCase()
                            .includes(normalizedGlobalFilter)
                    })
                    .sort((a, b) => Number(a.number) - Number(b.number))

                return (
                    <div
                        className={css({
                            height: "fit-content",
                            width: "fit-content",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            padding: "1rem",
                        })}
                    >
                        <div
                            className={css({
                                height: "fit-content",
                                width: "fit-content",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                            })}
                        >
                            {filteredIncomeStatements.length === 0 && (
                                <EmptyState
                                    icon={<IconReportMoney size={48} />}
                                    title={
                                        props.globalFilter
                                            ? "Aucune ligne trouvée"
                                            : "Aucune ligne de compte de résultat"
                                    }
                                    subtitle={props.globalFilter ? undefined : "Ajoutez une ligne pour commencer"}
                                />
                            )}
                            {filteredIncomeStatements.map((incomeStatement) => {
                                const incomeStatementChildren = getIncomeStatementChildren({
                                    incomeStatement: incomeStatement,
                                    incomeStatements: incomeStatements,
                                })

                                return (
                                    <IncomeStatementItem
                                        key={incomeStatement.id}
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                        incomeStatement={incomeStatement}
                                        incomeStatementChildren={incomeStatementChildren}
                                        level={0}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )
            }}
        </DataWrapper>
    )
}
