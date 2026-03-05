import * as v from "valibot"
import { dateTimeSchema, integerSchema, operation } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { computationIncomeStatementModel } from "../models/computationIncomeStatement.js"

export const computationIncomeStatementSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    idComputation: v.nonNullable(idSchema, "Ce champ est requis"),
    idIncomeStatement: v.nonNullable(idSchema, "Ce champ est requis"),
    index: v.nonNullable(integerSchema, "Ce champ est requis"),
    operation: v.nonNullable(v.picklist(operation, "Valeur invalide"), "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof computationIncomeStatementModel.$inferSelect>

export const computationIncomeStatementSchemaReturn = v.pick(computationIncomeStatementSchema, [
    "id",
    "idOrganization",
    "idYear",
    "idComputation",
    "idIncomeStatement",
    "index",
    "operation",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
