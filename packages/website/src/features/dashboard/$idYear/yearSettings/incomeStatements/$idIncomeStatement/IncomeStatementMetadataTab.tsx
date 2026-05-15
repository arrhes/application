import { readOneIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { FormatDateTime, FormatText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../components/layouts/DataWrapper.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"


export function IncomeStatementMetadataTab() {
    const params = useParams({
        strict: false,
    }) as { idYear?: string; idIncomeStatement?: string }

    return (
        <DataWrapper
            routeDefinition={readOneIncomeStatementRouteDefinition}
            body={{
                idYear: params.idYear,
                idIncomeStatement: params.idIncomeStatement,
            }}
        >
            {(incomeStatement) => {
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
                                    <FormatDateTime date={incomeStatement.createdAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Modifié le">
                                    <FormatDateTime date={incomeStatement.lastUpdatedAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Id">
                                    <FormatText>{incomeStatement.id}</FormatText>
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
