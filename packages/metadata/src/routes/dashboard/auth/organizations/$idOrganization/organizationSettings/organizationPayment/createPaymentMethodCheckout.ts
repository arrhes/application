import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const createPaymentMethodCheckoutRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/billing/payment-method-checkout`,
    schemas: {
        body: v.object({}),
        return: v.object({
            checkoutUrl: v.string(),
        }),
    },
})
