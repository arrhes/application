import * as v from "valibot"
import { integerSchema, organizationBillingType, routePath } from "../../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const createResourceSubscriptionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-resource-subscription`,
    schemas: {
        body: v.object({
            type: v.picklist(
                organizationBillingType.filter((t) => t !== "support") as [
                    "storage_gb" | "agent_tokens_million" | "ocr_pages_hundred",
                    ...("storage_gb" | "agent_tokens_million" | "ocr_pages_hundred")[],
                ],
            ),
            quantity: v.pipe(integerSchema, v.minValue(0)),
        }),
        return: v.object({
            checkoutUrl: v.nullable(v.string()),
        }),
    },
})
