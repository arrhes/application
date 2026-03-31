import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { idSchema } from "../../../../components/schemas/idSchema.js"
import { agentSessionSchemaReturn } from "../../../../schemas/agentSession.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const createOneAgentSessionRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-agent-session`,
    schemas: {
        body: v.object({
            idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
            title: v.optional(v.nullable(v.string())),
        }),
        return: agentSessionSchemaReturn,
    },
})
