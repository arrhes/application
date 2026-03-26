import * as v from "valibot"
import { booleanSchema, dateTimeSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { adminUserSessionModel } from "../models/adminUserSession.js"

export const adminUserSessionSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idAdminUser: v.nonNullable(idSchema, "Ce champ est requis"),
    isActive: v.nonNullable(booleanSchema, "Ce champ est requis"),
    expiresAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    ip: v.nullable(stringSchema),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof adminUserSessionModel.$inferSelect>

export const adminUserSessionSchemaReturn = v.pick(adminUserSessionSchema, [
    "id",
    "idAdminUser",
    "isActive",
    "expiresAt",
    "ip",
    "createdAt",
    "lastUpdatedAt",
])
