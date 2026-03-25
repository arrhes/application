import {
    readOneComputationIncomeStatementRouteDefinition,
    readOneComputationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { FormatText } from "../../../../../../../../../components/formats/formatText.tsx"
import { Chip } from "../../../../../../../../../components/layouts/chip.tsx"
import { DataBlock } from "../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"
import { computationIncomeStatementLayoutRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/$idComputationIncomeStatement/computationIncomeStatementLayoutRoute.tsx"

export function ComputationIncomeStatementPage() {
    const params = useParams({ from: computationIncomeStatementLayoutRoute.id })

    return (
        <DataWrapper
            routeDefinition={readOneComputationIncomeStatementRouteDefinition}
            body={{
                idYear: params.idYear,
                idComputationIncomeStatement: params.idComputationIncomeStatement,
            }}
        >
            {(computationIncomeStatement) => {
                return (
                    <Section.Item className={css({ flexDirection: "column" })}>
                        <DataBlock.Root>
                            <DataBlock.Header title="Informations" />
                            <DataBlock.Content>
                                <DataBlock.Item label="Poste du compte de résultat">
                                    <DataWrapper
                                        routeDefinition={readOneComputationRouteDefinition}
                                        body={{
                                            idYear: computationIncomeStatement.idYear,
                                            idComputation: computationIncomeStatement.idComputation,
                                        }}
                                    >
                                        {(computation) => (
                                            <FormatText>{`${computation.number} - ${computation.label}`}</FormatText>
                                        )}
                                    </DataWrapper>
                                </DataBlock.Item>
                                <DataBlock.Item label="Opération">
                                    <Chip
                                        text={
                                            computationIncomeStatement.operation === "plus"
                                                ? "Addition"
                                                : "Soustraction"
                                        }
                                    />
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
