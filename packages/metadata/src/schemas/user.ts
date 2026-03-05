import * as v from "valibot"
import { booleanSchema, dateTimeSchema, emailSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { userModel } from "../models/user.js"

export const userSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    isActive: v.nonNullable(booleanSchema, "Ce champ est requis"),
    alias: v.nullable(varcharSchema({ maxLength: 256 })),
    email: v.nonNullable(emailSchema, "Ce champ est requis"),
    isEmailValidated: v.nonNullable(booleanSchema, "Ce champ est requis"),
    emailToValidate: v.nullable(emailSchema),
    emailToken: v.nullable(stringSchema),
    emailTokenExpiresAt: v.nullable(dateTimeSchema),
    passwordHash: v.nonNullable(stringSchema, "Ce champ est requis"),
    passwordSalt: v.nonNullable(stringSchema, "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof userModel.$inferSelect>

export const userSchemaReturn = v.pick(userSchema, [
    "id",
    "isActive",
    "alias",
    "email",
    "isEmailValidated",
    "emailToValidate",
    "emailToken",
    "emailTokenExpiresAt",
    "passwordHash",
    "passwordSalt",
    "createdAt",
    "lastUpdatedAt",
])
