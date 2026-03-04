import { readAllIncomeStatementsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconReportMoney } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { InputDebounced } from "../../../../../components/inputs/inputDebounced.tsx"
import { InputText } from "../../../../../components/inputs/inputText.tsx"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/emptyState.tsx"
import { getIncomeStatementChildren } from "./getIncomeStatementChildren.tsx"
import { IncomeStatementItem } from "./incomeStatementItem.tsx"

export function IncomeStatementsTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
}) {
    const [globalFilter, setGlobalFilter] = useState("")

    return (
        <DataWrapper
            routeDefinition={readAllIncomeStatementsRouteDefinition}
            body={{
                idYear: props.idYear,
            }}
        >
            {(incomeStatements) => {
                const filteredIncomeStatements = incomeStatements
                    .filter((incomeStatement) => incomeStatement.idIncomeStatementParent === null)
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
                            padding: "4",
                            gap: "4",
                        })}
                    >
                        <InputDebounced value={globalFilter ?? ""} onChange={(value) => setGlobalFilter(value ?? "")}>
                            <InputText placeholder="Recherche" className={css({ maxWidth: "[320px]" })} />
                        </InputDebounced>
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
                                    title={globalFilter ? "Aucune ligne trouvée" : "Aucune ligne de compte de résultat"}
                                    subtitle={globalFilter ? undefined : "Ajoutez une ligne pour commencer"}
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
