import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { idSchema } from "../../../../../components/schemas/idSchema.js"
import { agentSessionSchemaReturn } from "../../../../../schemas/agentSession.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const updateOneAgentSessionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-agent-session`,
    schemas: {
        body: v.object({
            idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
            idYear: v.optional(v.nullable(idSchema)),
            customInstructions: v.optional(v.nullable(v.string())),
        }),
        return: agentSessionSchemaReturn,
    },
})
