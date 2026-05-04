import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { idSchema } from "../../../../../../../components/schemas/idSchema.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const cancelOrganizationBillingRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/cancel-organization-billing`,
    schemas: {
        body: v.object({
            idBilling: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.object({}),
    },
})
