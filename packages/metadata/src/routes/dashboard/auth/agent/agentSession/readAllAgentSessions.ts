import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { idSchema } from "../../../../../components/schemas/idSchema.js"
import { agentSessionSchema } from "../../../../../schemas/agentSession.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const agentSessionWithMatchedContentSchema = v.object({
    id: agentSessionSchema.entries.id,
    idOrganization: agentSessionSchema.entries.idOrganization,
    idUser: agentSessionSchema.entries.idUser,
    title: agentSessionSchema.entries.title,
    createdAt: agentSessionSchema.entries.createdAt,
    lastUpdatedAt: agentSessionSchema.entries.lastUpdatedAt,
    matchedContent: v.nullable(v.string()),
})

export const readAllAgentSessionsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/agent/sessions`,
    schemas: {
        body: v.object({
            idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
            search: v.optional(v.string()),
        }),
        return: v.array(agentSessionWithMatchedContentSchema),
    },
})
