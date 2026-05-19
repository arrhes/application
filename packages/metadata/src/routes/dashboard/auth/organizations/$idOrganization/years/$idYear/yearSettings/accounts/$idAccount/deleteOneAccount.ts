import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import { accountSchema } from "../../../../../../../../../../schemas/account.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneAccountRouteDefinition = routeDefinition({
    protocol: "http",
    method: "DELETE",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/accounts/:idAccount`,
    schemas: {
        body: v.object({
            idAccount: accountSchema.entries.id,
            idYear: accountSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
