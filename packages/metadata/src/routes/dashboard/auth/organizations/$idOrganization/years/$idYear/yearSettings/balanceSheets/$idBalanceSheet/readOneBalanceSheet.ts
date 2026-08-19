import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { balanceSheetSchema, balanceSheetSchemaReturn } from "../../../../../../../../../../schemas/balanceSheet.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const readOneBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/balance-sheets/:idBalanceSheet`,
    name: "read-one-balance-sheet",
    schemas: {
        body: v.object({
            idBalanceSheet: balanceSheetSchema.entries.id,
            idYear: balanceSheetSchema.entries.idYear,
        }),
        return: balanceSheetSchemaReturn,
    },
})
