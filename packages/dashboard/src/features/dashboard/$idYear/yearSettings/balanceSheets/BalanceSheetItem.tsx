import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { type ComponentProps, Fragment } from "react"
import type * as v from "valibot"
import { BalanceSheetRow } from "./BalanceSheetRow.tsx"
import { getBalanceSheetChildren } from "./getBalanceSheetChildren.tsx"

export function BalanceSheetItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    balanceSheetChildren: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
    level: number
    className?: ComponentProps<"div">["className"]
}) {
    return (
        <Fragment>
            <BalanceSheetRow
                idOrganization={props.idOrganization}
                idYear={props.idYear}
                balanceSheet={props.balanceSheet}
                level={props.level}
            />
            {(() => {
                const children: Array<React.JSX.Element> = []
                for (const balanceSheet of props.balanceSheetChildren) {
                    if (balanceSheet.idBalanceSheetParent !== props.balanceSheet.id) continue
                    const balanceSheetChildren = getBalanceSheetChildren({
                        balanceSheet: balanceSheet,
                        balanceSheets: props.balanceSheetChildren,
                    })

                    children.push(
                        <BalanceSheetItem
                            key={balanceSheet.id}
                            idOrganization={props.idOrganization}
                            idYear={props.idYear}
                            balanceSheet={balanceSheet}
                            balanceSheetChildren={balanceSheetChildren}
                            level={props.level + 1}
                        />,
                    )
                }
                return children
            })()}
        </Fragment>
    )
}
