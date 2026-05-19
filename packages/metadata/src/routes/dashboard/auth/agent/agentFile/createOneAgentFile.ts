import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { idSchema } from "../../../../../components/schemas/idSchema.js"
import { fileSchemaReturn } from "../../../../../schemas/file.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const createOneAgentFileRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/agent/sessions/:idAgentSession/files`,
    schemas: {
        body: v.object({
            idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
            idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
            fileName: v.nonNullable(v.string(), "Ce champ est requis"),
            fileType: v.nonNullable(v.string(), "Ce champ est requis"),
            fileSize: v.nonNullable(v.number(), "Ce champ est requis"),
            fileHash: v.nonNullable(v.string(), "Ce champ est requis"),
        }),
        return: v.object({
            file: fileSchemaReturn,
            url: v.nullable(v.string()),
        }),
    },
})
