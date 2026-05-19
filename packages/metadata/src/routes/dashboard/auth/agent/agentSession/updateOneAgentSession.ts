import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { idSchema } from "../../../../../components/schemas/idSchema.js"
import { agentSessionSchemaReturn } from "../../../../../schemas/agentSession.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const updateOneAgentSessionRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/agent/sessions/:idAgentSession`,
    schemas: {
        body: v.object({
            idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
            idYear: v.optional(v.nullable(idSchema)),
            customInstructions: v.optional(v.nullable(v.string())),
            fileIds: v.optional(v.nullable(v.array(idSchema))),
        }),
        return: agentSessionSchemaReturn,
    },
})
