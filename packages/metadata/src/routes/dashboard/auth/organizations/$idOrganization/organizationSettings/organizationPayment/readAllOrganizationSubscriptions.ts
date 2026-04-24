import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { organizationSubscriptionSchemaReturn } from "../../../../../../../schemas/organizationSubscription.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readAllOrganizationSubscriptionsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-organization-subscriptions`,
    schemas: {
        body: v.object({}),
        return: v.array(organizationSubscriptionSchemaReturn),
    },
})
