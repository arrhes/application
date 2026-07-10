import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { balanceSheetSchema } from "../../../../../../../../../../schemas/balanceSheet.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneBalanceSheetRouteDefinition = routeDefinition({
    protocol: "http",
    method: "DELETE",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/balance-sheets/:idBalanceSheet`,
    name: "delete-one-balance-sheet",
    schemas: {
        body: v.object({
            idBalanceSheet: balanceSheetSchema.entries.id,
            idYear: balanceSheetSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
