import {
    readOneComputationIncomeStatementRouteDefinition,
    readOneComputationRouteDefinition,
} from "@comptasse/application-metadata/routes"
import { Chip, FormatText } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../../../../../components/layouts/DataWrapper.tsx"
import { DataBlock } from "../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"

export function ComputationIncomeStatementPage() {
    const params = useParams({
        strict: false,
    }) as {
        idYear: string
        idComputationIncomeStatement: string
    }

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
                    <Section.Item
                        className={css({
                            flexDirection: "column",
                        })}
                    >
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
