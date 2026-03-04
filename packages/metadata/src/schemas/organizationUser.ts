import * as v from "valibot"
import { booleanSchema, dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { organizationUserStatus } from "../components/values/organizationUserStatus.js"
import type { organizationUserModel } from "../models/organizationUser.js"

export const organizationUserSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idUser: v.nonNullable(idSchema, "Ce champ est requis"),
    isOwner: v.nonNullable(booleanSchema, "Ce champ est requis"),
    isAdmin: v.nonNullable(booleanSchema, "Ce champ est requis"),
    status: v.nonNullable(v.picklist(organizationUserStatus, "Valeur invalide"), "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof organizationUserModel.$inferSelect>

export const organizationUserSchemaReturn = v.pick(organizationUserSchema, [
    "id",
    "idOrganization",
    "idUser",
    "isOwner",
    "isAdmin",
    "status",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
