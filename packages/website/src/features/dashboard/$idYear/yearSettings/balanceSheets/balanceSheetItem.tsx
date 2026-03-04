import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { type ComponentProps, Fragment } from "react"
import type * as v from "valibot"
import { BalanceSheetRow } from "./balanceSheetRow.tsx"
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
            {props.balanceSheetChildren
                .filter((balanceSheet) => balanceSheet.idBalanceSheetParent === props.balanceSheet.id)
                .map((balanceSheet) => {
                    const balanceSheetChildren = getBalanceSheetChildren({
                        balanceSheet: balanceSheet,
                        balanceSheets: props.balanceSheetChildren,
                    })

                    return (
                        <BalanceSheetItem
                            key={balanceSheet.id}
                            idOrganization={props.idOrganization}
                            idYear={props.idYear}
                            balanceSheet={balanceSheet}
                            balanceSheetChildren={balanceSheetChildren}
                            level={props.level + 1}
                        />
                    )
                })}
        </Fragment>
    )
}
