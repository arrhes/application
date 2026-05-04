import * as v from "valibot"
import {
    dateTimeSchema,
    integerSchema,
    organizationPaymentStatus,
    routePath,
} from "../../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readOrganizationBillingRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-organization-billing`,
    schemas: {
        body: v.object({}),
        return: v.object({
            isPremium: v.boolean(),
            subcriptionEndingAt: v.nullable(dateTimeSchema),
            mollieSubscriptionId: v.nullable(v.string()),
            status: v.nullable(v.picklist(organizationPaymentStatus)),
            subscriptionStatus: v.picklist(["active", "cancelled", "expired", "none"]),
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
