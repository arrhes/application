import { readAllBalanceSheetsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconScale } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { InputDebounced } from "../../../../../../../../components/inputs/inputDebounced.tsx"
import { InputText } from "../../../../../../../../components/inputs/inputText.tsx"
import { InputToggle } from "../../../../../../../../components/inputs/inputToggle.tsx"
import { DataWrapper } from "../../../../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../../../../components/layouts/emptyState.tsx"
import { BalanceSheetItem } from "./balanceSheetItem.tsx"
import { getBalanceSheetChildren } from "./getBalanceSheetChildren.tsx"

export function BalanceSheetTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
}) {
    const [globalFilter, setGlobalFilter] = useState("")
    const [side, setSide] = useState<"asset" | "liability" | null | undefined>("asset")

    return (
        <DataWrapper
            routeDefinition={readAllBalanceSheetsRouteDefinition}
            body={{
                idYear: props.idYear,
            }}
        >
            {(balanceSheets) => {
                const sidedBalanceSheets = balanceSheets.filter(
                    (balanceSheet) => side === null || side === undefined || balanceSheet.side === side,
                )

                const filteredBalanceSheets = sidedBalanceSheets
                    .filter((balanceSheet) => balanceSheet.idBalanceSheetParent === null)
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
                            gap: "4",
                        })}
                    >
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <InputDebounced
                                value={globalFilter ?? ""}
                                onChange={(value) => setGlobalFilter(value ?? "")}
                            >
                                <InputText placeholder="Recherche" className={css({ maxWidth: "[320px]" })} />
                            </InputDebounced>
                            <InputToggle
                                value={side}
                                onChange={setSide}
                                options={[
                                    { label: "Actif", value: "asset" },
                                    { label: "Passif", value: "liability" },
                                ]}
                            />
                        </div>
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
                                    title={globalFilter ? "Aucune ligne trouvée" : "Aucune ligne de bilan"}
                                    subtitle={globalFilter ? undefined : "Ajoutez une ligne pour commencer"}
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
