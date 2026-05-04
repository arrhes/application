import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { idSchema } from "../../../../../../../components/schemas/idSchema.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const readOneInvoiceUblRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-invoice-ubl`,
    schemas: {
        body: v.object({
            idInvoice: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.object({
            invoiceNumber: v.string(),
            fileName: v.string(),
            xml: v.string(),
        }),
    },
})
