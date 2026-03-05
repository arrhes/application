import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { documentSchema, documentSchemaReturn } from "../../../../../../../../../schemas/document.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const readOneDocumentRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-document`,
    schemas: {
        body: v.object({
            idDocument: documentSchema.entries.id,
            idYear: documentSchema.entries.idYear,
        }),
        return: documentSchemaReturn,
    },
})
