import * as v from "valibot"
import { routePath } from "../../../../../../components/index.js"
import { apiKeySchema, apiKeySchemaReturn } from "../../../../../../schemas/apiKey.js"
import { routeDefinition } from "../../../../../../utilities/routeDefinition.js"

export const createOneApiKeyRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-api-key`,
    schemas: {
        body: v.object({
            name: v.optional(apiKeySchema.entries.name),
        }),
        return: v.object({
            ...apiKeySchemaReturn.entries,
            rawKey: v.nonNullable(v.string("Doit être une chaîne de caractères"), "Ce champ est requis"),
        }),
    },
})
