import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { idSchema } from "../../../../../components/schemas/idSchema.js"
import { agentSessionSchemaReturn } from "../../../../../schemas/agentSession.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const readOneAgentSessionRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/agent/sessions/:idAgentSession`,
    schemas: {
        body: v.object({
            idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: agentSessionSchemaReturn,
    },
})
