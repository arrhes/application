import * as v from "valibot"
import { dateTimeSchema, documentType, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { documentModel } from "../models/document.js"

export const documentSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    label: v.nonNullable(stringSchema, "Ce champ est requis"),
    type: v.nonNullable(v.picklist(documentType, "Valeur invalide"), "Ce champ est requis"),
    storageKey: v.nonNullable(stringSchema, "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof documentModel.$inferSelect>

export const documentSchemaReturn = v.pick(documentSchema, [
    "id",
    "idOrganization",
    "idYear",
    "label",
    "type",
    "storageKey",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
