import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { idSchema } from "../../../../components/schemas/idSchema.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const searchReferenceableRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/agent/search`,
    schemas: {
        body: v.object({
            idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
            idYear: v.optional(v.nullable(idSchema)),
            query: v.nonNullable(v.string(), "Ce champ est requis"),
        }),
        return: v.array(
            v.object({
                id: v.nonNullable(idSchema, "Ce champ est requis"),
                type: v.picklist([
                    "account",
                    "entry",
                    "journal",
                    "tag",
                    "file",
                ]),
                label: v.string(),
            }),
        ),
    },
})
