import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { documentSchema, documentSchemaReturn } from "../../../../../../../../schemas/document.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readAllDocumentsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-documents`,
    schemas: {
        body: v.object({
            idYear: documentSchema.entries.idYear,
        }),
        return: v.array(documentSchemaReturn),
    },
})
