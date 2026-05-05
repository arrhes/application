import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { integerSchema } from "../../../../../../../components/schemas/integerSchema.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const createWalletTopUpCheckoutRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-wallet-top-up-checkout`,
    schemas: {
        body: v.object({
            amountInCents: v.pipe(integerSchema, v.minValue(1)),
        }),
        return: v.object({
            checkoutUrl: v.string(),
        }),
    },
})
