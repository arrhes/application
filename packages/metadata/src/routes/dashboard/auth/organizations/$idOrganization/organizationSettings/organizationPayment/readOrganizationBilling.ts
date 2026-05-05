import * as v from "valibot"
import { integerSchema, organizationPaymentStatus, routePath } from "../../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readOrganizationBillingRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-organization-billing`,
    schemas: {
        body: v.object({}),
        return: v.object({
            status: v.nullable(v.picklist(organizationPaymentStatus)),
            ocrCurrentMonthUsage: v.number(),
            ocrMonthlyLimit: v.number(),
            agentTokensCurrentMonthUsage: v.number(),
            agentTokensMonthlyLimit: v.number(),
            storageLimit: integerSchema,
            storageCurrentUsage: integerSchema,
            totalSubscriptionAmountInCents: integerSchema,
        }),
    },
})
