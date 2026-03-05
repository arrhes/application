import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { balanceSheetSchema } from "../../../../../../../../../schemas/balanceSheet.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-balance-sheet`,
    schemas: {
        body: v.object({
            idBalanceSheet: balanceSheetSchema.entries.id,
            idYear: balanceSheetSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
