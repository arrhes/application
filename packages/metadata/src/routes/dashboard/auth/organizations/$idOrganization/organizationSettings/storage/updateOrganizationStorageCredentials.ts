import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const updateOrganizationStorageCredentialsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/organizations/:idOrganization/storage`,
    name: "update-organization-storage-credentials",
    schemas: {
        body: v.object({
            storageEndpoint: v.optional(v.nullable(v.string())),
            storageAccessKey: v.optional(v.nullable(v.string())),
            storageSecretKey: v.optional(v.nullable(v.string())),
            storageBucketName: v.optional(v.nullable(v.string())),
            storageRegion: v.optional(v.nullable(v.string())),
        }),
        return: v.object({
            success: v.boolean(),
        }),
    },
})
