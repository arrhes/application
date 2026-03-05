import * as v from "valibot"
import { dateTimeSchema, integerSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { computationModel } from "../models/computation.js"

export const computationSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    index: v.nonNullable(integerSchema, "Ce champ est requis"),
    number: v.nonNullable(varcharSchema({ maxLength: 32 }), "Ce champ est requis"),
    label: v.nonNullable(varcharSchema({ maxLength: 256 }), "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof computationModel.$inferSelect>

export const computationSchemaReturn = v.pick(computationSchema, [
    "id",
    "idOrganization",
    "idYear",
    "index",
    "number",
    "label",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
