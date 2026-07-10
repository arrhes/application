import * as v from "valibot"
import { booleanSchema, dateTimeSchema, integerSchema, organizationScope } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { organizationModel } from "../models/organization.js"

export const organizationSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    isArchived: v.nonNullable(booleanSchema, "Ce champ est requis"),
    scope: v.nonNullable(v.picklist(organizationScope, "Valeur invalide"), "Ce champ est requis"),
    name: v.nonNullable(
        varcharSchema({
            maxLength: 256,
        }),
        "Ce champ est requis",
    ),
    storageLimit: v.nonNullable(integerSchema, "Ce champ est requis"),
    storageCurrentUsage: v.nonNullable(integerSchema, "Ce champ est requis"),
    storageEndpoint: v.nullable(v.string()),
    storageAccessKey: v.nullable(v.string()),
    storageSecretKey: v.nullable(v.string()),
    storageBucketName: v.nullable(v.string()),
    storageRegion: v.nullable(v.string()),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof organizationModel.$inferSelect>

export const organizationSchemaReturn = v.pick(organizationSchema, [
    "id",
    "scope",
    "name",
    "storageLimit",
    "storageCurrentUsage",
    "storageEndpoint",
    "storageAccessKey",
    "storageSecretKey",
    "storageBucketName",
    "storageRegion",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
