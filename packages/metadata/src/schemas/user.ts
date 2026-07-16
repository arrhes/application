import * as v from "valibot"
import { booleanSchema, dateTimeSchema, emailSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { userModel } from "../models/user.js"

export const userSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    isActive: v.nonNullable(booleanSchema, "Ce champ est requis"),
    alias: v.nullable(
        varcharSchema({
            maxLength: 256,
        }),
    ),
    email: v.nonNullable(emailSchema, "Ce champ est requis"),
    passwordHash: v.nonNullable(stringSchema, "Ce champ est requis"),
    passwordSalt: v.nonNullable(stringSchema, "Ce champ est requis"),
    ocrEndpoint: v.nullable(v.string()),
    ocrApiKey: v.nullable(v.string()),
    ocrModel: v.nullable(v.string()),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof userModel.$inferSelect>

export const userSchemaReturn = v.pick(userSchema, [
    "id",
    "isActive",
    "alias",
    "email",
    "ocrEndpoint",
    "ocrApiKey",
    "ocrModel",
    "createdAt",
    "lastUpdatedAt",
])
