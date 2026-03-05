import * as v from "valibot"
import { booleanSchema, dateTimeSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { apiKeyModel } from "../models/apiKey.js"

export const apiKeySchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idUser: v.nonNullable(idSchema, "Ce champ est requis"),
    keyHash: v.nonNullable(stringSchema, "Ce champ est requis"),
    name: v.nonNullable(stringSchema, "Ce champ est requis"),
    isDefault: v.nonNullable(booleanSchema, "Ce champ est requis"),
    isActive: v.nonNullable(booleanSchema, "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof apiKeyModel.$inferSelect>

export const apiKeySchemaReturn = v.pick(apiKeySchema, [
    "id",
    "idOrganization",
    "idUser",
    "name",
    "isDefault",
    "isActive",
    "createdAt",
    "lastUpdatedAt",
])
