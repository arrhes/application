import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "../../../../../../../../schemas/balanceSheet.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readAllBalanceSheetsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-balance-sheets`,
    schemas: {
        body: v.object({
            idYear: balanceSheetSchema.entries.idYear,
        }),
        return: v.array(balanceSheetSchemaReturn),
    },
})
