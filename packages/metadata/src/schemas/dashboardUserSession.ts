import * as v from "valibot"
import { booleanSchema, dateTimeSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { dashboardUserSessionModel } from "../models/dashboardUserSession.js"

export const dashboardUserSessionSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idUser: v.nonNullable(idSchema, "Ce champ est requis"),
    isActive: v.nonNullable(booleanSchema, "Ce champ est requis"),
    expiresAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    ip: v.nullable(stringSchema),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof dashboardUserSessionModel.$inferSelect>

export const dashboardUserSessionSchemaReturn = v.pick(dashboardUserSessionSchema, [
    "id",
    "idUser",
    "isActive",
    "expiresAt",
    "ip",
    "lastUpdatedAt",
    "createdAt",
])
