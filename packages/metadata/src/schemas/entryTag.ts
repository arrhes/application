import * as v from "valibot"
import { dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { entryTagModel } from "../models/entryTag.js"

export const entryTagSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    idEntry: v.nonNullable(idSchema, "Ce champ est requis"),
    idTag: v.nonNullable(idSchema, "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
}) satisfies v.GenericSchema<typeof entryTagModel.$inferSelect>

export const entryTagSchemaReturn = v.pick(entryTagSchema, [
    "id",
    "idOrganization",
    "idYear",
    "idEntry",
    "idTag",
    "createdAt",
])
