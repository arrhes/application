import * as v from "valibot"
import { integerSchema, routePath } from "../../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const updateOcrSubscriptionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-ocr-subscription`,
    schemas: {
        body: v.object({
            newQuantity: v.pipe(integerSchema, v.minValue(0)),
        }),
        return: v.object({}),
    },
})
