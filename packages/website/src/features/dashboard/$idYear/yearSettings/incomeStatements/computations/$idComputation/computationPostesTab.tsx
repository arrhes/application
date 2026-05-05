import { readOneComputationRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../components/layouts/section/section.tsx"
import { computationLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute.tsx"
import { ComputationIncomeStatementsTable } from "./computationIncomeStatements/computationIncomeStatementTable.tsx"
import { CreateOneComputationIncomeStatement } from "./computationIncomeStatements/createOneComputationIncomeStatement.tsx"

export function ComputationPostesTab() {
    const params = useParams({ from: computationLayoutRoute.id })

    return (
        <DataWrapper
            routeDefinition={readOneComputationRouteDefinition}
            body={{
                idYear: params.idYear,
                idComputation: params.idComputation,
            }}
        >
            {(computation) => {
                return (
                    <Section.Item>
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <CreateOneComputationIncomeStatement computation={computation}>
                                <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter" />
                            </CreateOneComputationIncomeStatement>
                        </div>
                        <ComputationIncomeStatementsTable computation={computation} />
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
