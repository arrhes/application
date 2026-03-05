import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { accountSchema } from "../../../../../../../../../schemas/account.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneAccountRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-account`,
    schemas: {
        body: v.object({
            idAccount: accountSchema.entries.id,
            idYear: accountSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
