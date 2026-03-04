/*
import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { booleanSchema } from "../../../../../../../../components/schemas/booleanSchema.js"
import { accountSchema, accountSchemaReturn } from "../../../../../../../../schemas/account.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const generateAccountsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-accounts`,
    schemas: {
        body: v.object({
            idYear: accountSchema.entries.idYear,
            isMinimalSystem: v.nullable(booleanSchema),
            isReplicatingAccounts: v.nullable(booleanSchema),
        }),
        return: v.array(accountSchemaReturn),
    },
})
*/
