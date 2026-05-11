import { readOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { FormatDateTime, FormatText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { balanceSheetLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetLayoutRoute.tsx"

export function BalanceSheetMetadataTab() {
    const params = useParams({
        from: balanceSheetLayoutRoute.id,
    })

    return (
        <DataWrapper
            routeDefinition={readOneBalanceSheetRouteDefinition}
            body={{
                idYear: params.idYear,
                idBalanceSheet: params.idBalanceSheet,
            }}
        >
            {(balanceSheet) => {
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
                                    <FormatDateTime date={balanceSheet.createdAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Modifié le">
                                    <FormatDateTime date={balanceSheet.lastUpdatedAt} />
                                </DataBlock.Item>
                                <DataBlock.Item label="Id">
                                    <FormatText>{balanceSheet.id}</FormatText>
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
