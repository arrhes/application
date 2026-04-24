import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { idSchema } from "../../../../../../../components/schemas/idSchema.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const cancelOrganizationSubscriptionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/cancel-organization-subscription`,
    schemas: {
        body: v.object({
            idSubscription: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.object({}),
    },
})
