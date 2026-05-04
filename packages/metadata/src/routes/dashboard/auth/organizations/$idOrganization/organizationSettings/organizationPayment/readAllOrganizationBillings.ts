import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { organizationBillingSchemaReturn } from "../../../../../../../schemas/organizationBilling.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readAllOrganizationBillingsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-organization-billings`,
    schemas: {
        body: v.object({}),
        return: v.array(organizationBillingSchemaReturn),
    },
})
