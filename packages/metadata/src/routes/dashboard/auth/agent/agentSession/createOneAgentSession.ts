import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { idSchema } from "../../../../../components/schemas/idSchema.js"
import { agentSessionSchemaReturn } from "../../../../../schemas/agentSession.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const createOneAgentSessionRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/agent/sessions`,
    schemas: {
        body: v.object({
            idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
            message: v.nonNullable(v.string(), "Ce champ est requis"),
            idYear: v.optional(v.nullable(idSchema)),
            customInstructions: v.optional(v.nullable(v.string())),
        }),
        return: agentSessionSchemaReturn,
    },
})
