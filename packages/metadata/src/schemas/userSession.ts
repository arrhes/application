import * as v from "valibot"
import { booleanSchema, dateTimeSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { userSessionModel } from "../models/userSession.js"

export const userSessionSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idUser: v.nonNullable(idSchema, "Ce champ est requis"),
    isActive: v.nonNullable(booleanSchema, "Ce champ est requis"),
    expiresAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    ip: v.nullable(stringSchema),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof userSessionModel.$inferSelect>

export const userSessionSchemaReturn = v.pick(userSessionSchema, [
    "id",
    "idUser",
    "isActive",
    "expiresAt",
    "ip",
    "lastUpdatedAt",
    "createdAt",
])
