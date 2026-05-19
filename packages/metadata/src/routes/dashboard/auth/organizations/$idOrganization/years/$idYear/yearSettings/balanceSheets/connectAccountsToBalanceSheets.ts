import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { incomeStatementSchema } from "../../../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const connectAccountsToBalanceSheetsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/balance-sheets/connect-accounts`,
    schemas: {
        body: v.object({
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
