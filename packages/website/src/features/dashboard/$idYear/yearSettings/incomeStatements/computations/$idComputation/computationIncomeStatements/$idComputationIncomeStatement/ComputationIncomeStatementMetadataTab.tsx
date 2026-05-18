import { readOneComputationIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { FormatDateTime, FormatText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../../../../../components/layouts/DataWrapper.tsx"
import { DataBlock } from "../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"

export function ComputationIncomeStatementMetadataTab() {
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
                            <DataBlock.Header title="Métadonnées" />
                            <DataBlock.Content>
                                <DataBlock.Item label="Ajouté le">
                                    <FormatDateTime date={computationIncomeStatement.createdAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Modifié le">
                                    <FormatDateTime date={computationIncomeStatement.lastUpdatedAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Id">
                                    <FormatText>{computationIncomeStatement.id}</FormatText>
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
