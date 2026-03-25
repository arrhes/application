import { readOneIncomeStatementRouteDefinition } from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { FormatText } from "../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { incomeStatementLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/$idIncomeStatement/incomeStatementLayoutRoute.tsx"

export function IncomeStatementPage() {
    const params = useParams({ from: incomeStatementLayoutRoute.id })

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
                    <Section.Item className={css({ flexDirection: "column" })}>
                        <DataBlock.Root>
                            <DataBlock.Header title="Informations" />
                            <DataBlock.Content>
                                <DataBlock.Item label="Numéro">
                                    <FormatText>{incomeStatement.number.toString()}</FormatText>
                                </DataBlock.Item>
                                <DataBlock.Item label="Libellé">
                                    <FormatText>{incomeStatement.label}</FormatText>
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
