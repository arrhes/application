import { readOneComputationRouteDefinition } from "@arrhes/application-metadata/routes"
import { FormatText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataBlock } from "../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../../components/layouts/section/section.tsx"
import { computationLayoutRoute } from "../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/incomeStatements/computations/$idComputation/computationLayoutRoute.tsx"

export function ComputationPage() {
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
                    <Section.Item className={css({ flexDirection: "column" })}>
                        <DataBlock.Root>
                            <DataBlock.Header title="Informations" />
                            <DataBlock.Content>
                                <DataBlock.Item label="Numéro">
                                    <FormatText>{computation.number}</FormatText>
                                </DataBlock.Item>
                                <DataBlock.Item label="Libellé">
                                    <FormatText>{computation.label}</FormatText>
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
