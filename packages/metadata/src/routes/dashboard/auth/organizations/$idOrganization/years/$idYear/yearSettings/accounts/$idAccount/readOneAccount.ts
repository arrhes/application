import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { accountSchema, accountSchemaReturn } from "../../../../../../../../../../schemas/account.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const readOneAccountRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/accounts/:idAccount`,
    name: "read-one-account",
    schemas: {
        body: v.object({
            idAccount: accountSchema.entries.id,
            idYear: accountSchema.entries.idYear,
        }),
        return: accountSchemaReturn,
    },
})
