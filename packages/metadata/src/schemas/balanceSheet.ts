import * as v from "valibot"
import { balanceSheetSide, booleanSchema, dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { balanceSheetModel } from "../models/balanceSheet.js"

export const balanceSheetSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    idBalanceSheetParent: v.nullable(idSchema),
    isDefault: v.nonNullable(booleanSchema, "Ce champ est requis"),
    isComputed: v.nonNullable(booleanSchema, "Ce champ est requis"),
    side: v.picklist(balanceSheetSide, "Valeur invalide"),
    number: v.nonNullable(varcharSchema({ maxLength: 32 }), "Ce champ est requis"),
    label: v.nonNullable(varcharSchema({ maxLength: 256 }), "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof balanceSheetModel.$inferSelect>

export const balanceSheetSchemaReturn = v.pick(balanceSheetSchema, [
    "id",
    "idOrganization",
    "idYear",
    "idBalanceSheetParent",
    "isDefault",
    "isComputed",
    "side",
    "number",
    "label",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
