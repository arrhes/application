import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "../../../../../../../../../schemas/balanceSheet.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readOneBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-balance-sheet`,
    schemas: {
        body: v.object({
            idBalanceSheet: balanceSheetSchema.entries.id,
            idYear: balanceSheetSchema.entries.idYear,
        }),
        return: balanceSheetSchemaReturn,
    },
})
