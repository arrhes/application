import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { idSchema } from "../../../../components/schemas/idSchema.js"
import { agentSessionSchemaReturn } from "../../../../schemas/agentSession.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const readAllAgentSessionsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-agent-sessions`,
    schemas: {
        body: v.object({
            idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
        }),
        return: v.array(agentSessionSchemaReturn),
    },
})
