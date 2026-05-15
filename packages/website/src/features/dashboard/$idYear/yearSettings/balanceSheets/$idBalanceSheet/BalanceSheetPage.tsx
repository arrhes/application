import { readOneBalanceSheetRouteDefinition } from "@arrhes/application-metadata/routes"
import { FormatText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../components/layouts/DataWrapper.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { balanceSheetLayoutRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/balanceSheets/$idBalanceSheet/balanceSheetLayoutRoute.tsx"

export function BalanceSheetPage() {
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
                            <DataBlock.Header title="Informations" />
                            <DataBlock.Content>
                                <DataBlock.Item label="Numéro">
                                    <FormatText>{balanceSheet.number.toString()}</FormatText>
                                </DataBlock.Item>
                                <DataBlock.Item label="Libellé">
                                    <FormatText>{balanceSheet.label}</FormatText>
                                </DataBlock.Item>
                            </DataBlock.Content>
                        </DataBlock.Root>
                    </Section.Item>
                )
            }}
        </DataWrapper>
    )
}
