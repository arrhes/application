import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { organizationPaymentSchemaReturn } from "../../../../../../../schemas/organizationPayment.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readAllOrganizationPaymentsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/payments`,
    schemas: {
        body: v.object({}),
        return: v.array(organizationPaymentSchemaReturn),
    },
})
