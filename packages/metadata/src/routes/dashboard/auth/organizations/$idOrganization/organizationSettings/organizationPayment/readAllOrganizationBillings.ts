import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { organizationBillingSchemaReturn } from "../../../../../../../schemas/organizationBilling.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readAllOrganizationBillingsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/billings`,
    schemas: {
        body: v.object({}),
        return: v.array(organizationBillingSchemaReturn),
    },
})
