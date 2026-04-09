import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { idSchema } from "../../../../../components/schemas/idSchema.js"
import { agentSessionSchemaReturn } from "../../../../../schemas/agentSession.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const readOneAgentSessionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-agent-session`,
    schemas: {
        body: v.object({
            idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: agentSessionSchemaReturn,
    },
})
