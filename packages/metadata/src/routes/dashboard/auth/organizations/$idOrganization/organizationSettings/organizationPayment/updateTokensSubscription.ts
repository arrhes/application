import * as v from "valibot"
import { integerSchema, routePath } from "../../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const updateTokensSubscriptionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-tokens-subscription`,
    schemas: {
        body: v.object({
            newQuantity: v.pipe(integerSchema, v.minValue(0)),
        }),
        return: v.object({}),
    },
})
