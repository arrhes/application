import * as v from "valibot"
import { booleanSchema, dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { incomeStatementModel } from "../models/incomeStatement.js"

export const incomeStatementSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    idIncomeStatementParent: v.nullable(idSchema),
    isDefault: v.nonNullable(booleanSchema, "Ce champ est requis"),
    isComputed: v.nonNullable(booleanSchema, "Ce champ est requis"),
    number: v.nonNullable(varcharSchema({ maxLength: 32 }), "Ce champ est requis"),
    label: v.nonNullable(varcharSchema({ maxLength: 256 }), "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof incomeStatementModel.$inferSelect>

export const incomeStatementSchemaReturn = v.pick(incomeStatementSchema, [
    "id",
    "idOrganization",
    "idYear",
    "idIncomeStatementParent",
    "isDefault",
    "isComputed",
    "number",
    "label",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
