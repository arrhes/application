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
            licenceAmount: integerSchema,
            storageLimit: integerSchema,
            storageCurrentUsage: integerSchema,
            ocrPagesTotalAvailable: integerSchema,
            ocrPagesTotalUsed: integerSchema,
            tokensTotalAvailable: integerSchema,
            tokensTotalUsed: integerSchema,
            totalSubscriptionAmountInCents: integerSchema,
        }),
    },
})
