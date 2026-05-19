import * as v from "valibot"
import { integerSchema, routePath } from "../../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const updateOcrSubscriptionRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/organizations/:idOrganization/billing/ocr-subscription`,
    schemas: {
        body: v.object({
            newQuantity: v.pipe(integerSchema, v.minValue(0)),
        }),
        return: v.object({}),
    },
})
