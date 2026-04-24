import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { invoiceSchemaReturn } from "../../../../../../../schemas/invoice.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readAllInvoicesRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-invoices`,
    schemas: {
        body: v.object({}),
        return: v.array(invoiceSchemaReturn),
    },
})
