import * as v from "valibot"
import { dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { recordModel } from "../models/record.js"

export const recordSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    idJournal: v.nullable(idSchema),
    idFile: v.nullable(idSchema),
    idRecordLabel: v.nullable(idSchema),
    label: v.nonNullable(varcharSchema({ maxLength: 256 }), "Ce champ est requis"),
    date: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof recordModel.$inferSelect>

export const recordSchemaReturn = v.pick(recordSchema, [
    "id",
    "idOrganization",
    "idYear",
    "idJournal",
    "idFile",
    "idRecordLabel",
    "label",
    "date",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
