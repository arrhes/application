import * as v from "valibot"
import { dateTimeSchema, organizationPaymentStatus, routePath } from "../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const readOrganizationSubscriptionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-organization-subscription`,
    schemas: {
        body: v.object({}),
        return: v.object({
            isPremium: v.boolean(),
            subcriptionEndingAt: v.nullable(dateTimeSchema),
            mollieSubscriptionId: v.nullable(v.string()),
            status: v.nullable(v.picklist(organizationPaymentStatus)),
            subscriptionStatus: v.picklist(["active", "cancelled", "expired", "none"]),
        }),
    },
})
