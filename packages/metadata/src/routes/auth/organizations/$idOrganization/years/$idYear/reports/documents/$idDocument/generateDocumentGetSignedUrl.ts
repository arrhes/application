import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { documentSchema } from "../../../../../../../../../schemas/document.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const generateDocumentGetSignedUrlRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-document-get-signed-url`,
    schemas: {
        body: v.object({
            idDocument: documentSchema.entries.id,
            idYear: documentSchema.entries.idYear,
        }),
        return: v.object({
            url: v.string(),
        }),
    },
})
