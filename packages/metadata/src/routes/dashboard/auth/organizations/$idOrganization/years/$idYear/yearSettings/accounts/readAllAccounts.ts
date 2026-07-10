import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { accountSchema, accountSchemaReturn } from "../../../../../../../../../schemas/account.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readAllAccountsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/accounts`,
    name: "read-all-accounts",
    schemas: {
        body: v.object({
            idYear: accountSchema.entries.idYear,
        }),
        return: v.array(accountSchemaReturn),
    },
})
