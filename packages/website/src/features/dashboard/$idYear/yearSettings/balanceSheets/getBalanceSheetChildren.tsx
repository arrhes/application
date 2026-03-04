import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type * as v from "valibot"

export function getBalanceSheetChildren(parameters: {
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    balanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>>
}): Array<v.InferOutput<typeof returnedSchemas.balanceSheet>> {
    if (parameters.balanceSheets.length === 0) return []

    const children = parameters.balanceSheets.filter(
        (balanceSheet) => balanceSheet.idBalanceSheetParent === parameters.balanceSheet.id,
    )

    return [
        ...children,
        ...children.flatMap((balanceSheet) =>
            getBalanceSheetChildren({
                balanceSheet: balanceSheet,
                balanceSheets: parameters.balanceSheets,
            }),
        ),
    ]
}
