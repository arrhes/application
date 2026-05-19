import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { idSchema } from "../../../../../../../components/schemas/idSchema.js"
import { invoiceSchemaReturn } from "../../../../../../../schemas/invoice.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readOneInvoiceRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/invoices/:idInvoice`,
    schemas: {
        body: v.object({
            idInvoice: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: invoiceSchemaReturn,
    },
})
