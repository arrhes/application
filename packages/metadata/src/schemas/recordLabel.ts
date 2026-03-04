import * as v from "valibot"
import { dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { recordLabelModel } from "../models/recordLabel.js"

export const recordLabelSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),

    label: v.nonNullable(varcharSchema({ maxLength: 256 }), "Ce champ est requis"),

    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof recordLabelModel.$inferSelect>

export const recordLabelSchemaReturn = v.pick(recordLabelSchema, [
    "id",
    "idOrganization",
    "idYear",

    "label",

    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
