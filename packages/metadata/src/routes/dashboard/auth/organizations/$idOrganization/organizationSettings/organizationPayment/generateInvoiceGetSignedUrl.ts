import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { idSchema } from "../../../../../../../components/schemas/idSchema.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const generateInvoiceGetSignedUrlRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-invoice-get-signed-url`,
    schemas: {
        body: v.object({
            idInvoice: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.object({
            url: v.string(),
        }),
    },
})
