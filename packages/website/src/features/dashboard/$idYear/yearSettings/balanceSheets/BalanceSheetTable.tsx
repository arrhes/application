import { readAllBalanceSheetsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconScale } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../components/layouts/DataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/EmptyState.tsx"
import { BalanceSheetItem } from "./BalanceSheetItem.tsx"
import { getBalanceSheetChildren } from "./getBalanceSheetChildren.tsx"

export function BalanceSheetTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    side: "asset" | "liability"
    globalFilter: string
}) {
    const normalizedGlobalFilter = props.globalFilter.trim().toLowerCase()

    return (
        <DataWrapper
            routeDefinition={readAllBalanceSheetsRouteDefinition}
            body={{
                idYear: props.idYear,
            }}
        >
            {(balanceSheets) => {
                const sidedBalanceSheets = balanceSheets.filter((balanceSheet) => balanceSheet.side === props.side)

                const filteredBalanceSheets = sidedBalanceSheets
                    .filter((balanceSheet) => balanceSheet.idBalanceSheetParent === null)
                    .filter((balanceSheet) => {
                        if (normalizedGlobalFilter.length === 0) {
                            return true
                        }

                        return `${balanceSheet.number} ${balanceSheet.label}`
                            .toLowerCase()
                            .includes(normalizedGlobalFilter)
                    })
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
                            padding: "1rem",
                        })}
                    >
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
                            {filteredBalanceSheets.length === 0 && (
                                <EmptyState
                                    icon={<IconScale size={48} />}
                                    title={props.globalFilter ? "Aucune ligne trouvée" : "Aucune ligne de bilan"}
                                    subtitle={props.globalFilter ? undefined : "Ajoutez une ligne pour commencer"}
                                />
                            )}
                            {filteredBalanceSheets.map((balanceSheet) => {
                                const balanceSheetChildren = getBalanceSheetChildren({
                                    balanceSheet: balanceSheet,
                                    balanceSheets: sidedBalanceSheets,
                                })

                                return (
                                    <BalanceSheetItem
                                        key={balanceSheet.id}
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                        balanceSheet={balanceSheet}
                                        balanceSheetChildren={balanceSheetChildren}
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
