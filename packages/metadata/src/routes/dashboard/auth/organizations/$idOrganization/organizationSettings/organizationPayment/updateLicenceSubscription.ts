import * as v from "valibot"
import { integerSchema, routePath } from "../../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const updateLicenceSubscriptionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-licence-subscription`,
    schemas: {
        body: v.object({
            newAmountInCents: v.pipe(integerSchema, v.minValue(0)),
        }),
        return: v.object({}),
    },
})
