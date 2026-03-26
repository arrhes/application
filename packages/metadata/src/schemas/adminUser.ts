import * as v from "valibot"
import { booleanSchema, dateTimeSchema, emailSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { adminUserModel } from "../models/adminUser.js"

export const adminUserSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    isActive: v.nonNullable(booleanSchema, "Ce champ est requis"),
    email: v.nonNullable(emailSchema, "Ce champ est requis"),
    passwordHash: v.nonNullable(stringSchema, "Ce champ est requis"),
    passwordSalt: v.nonNullable(stringSchema, "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof adminUserModel.$inferSelect>

export const adminUserSchemaReturn = v.pick(adminUserSchema, [
    "id",
    "isActive",
    "email",
    "passwordHash",
    "passwordSalt",
    "createdAt",
    "lastUpdatedAt",
])
