import * as v from "valibot"
import { dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { journalModel } from "../models/journal.js"

export const journalSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    code: v.nonNullable(varcharSchema({ maxLength: 32 }), "Ce champ est requis"),
    label: v.nullable(varcharSchema({ maxLength: 256 })),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof journalModel.$inferSelect>

export const journalSchemaReturn = v.pick(journalSchema, [
    "id",
    "idOrganization",
    "idYear",
    "code",
    "label",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
