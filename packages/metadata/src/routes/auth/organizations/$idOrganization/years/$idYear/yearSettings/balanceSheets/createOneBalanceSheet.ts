import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "../../../../../../../../schemas/balanceSheet.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const createOneBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-balance-sheet`,
    schemas: {
        body: v.object({
            idYear: balanceSheetSchema.entries.idYear,
            idBalanceSheetParent: balanceSheetSchema.entries.idBalanceSheetParent,
            isComputed: balanceSheetSchema.entries.isComputed,
            side: balanceSheetSchema.entries.side,
            number: balanceSheetSchema.entries.number,
            label: balanceSheetSchema.entries.label,
        }),
        return: balanceSheetSchemaReturn,
    },
})
