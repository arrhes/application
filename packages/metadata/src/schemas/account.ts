import * as v from "valibot"
import { accountType, balanceSheetFlow, booleanSchema, dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import { balanceSheetColumn } from "../components/values/balanceSheetColumn.js"
import type { accountModel } from "../models/account.js"

export const accountSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    idAccountParent: v.nullable(idSchema),

    idBalanceSheetAsset: v.nullable(idSchema),
    balanceSheetAssetColumn: v.nullable(v.picklist(balanceSheetColumn, "Valeur invalide")),
    balanceSheetAssetFlow: v.nullable(v.picklist(balanceSheetFlow, "Valeur invalide")),

    idBalanceSheetLiability: v.nullable(idSchema),
    balanceSheetLiabilityColumn: v.nullable(v.picklist(balanceSheetColumn, "Valeur invalide")),
    balanceSheetLiabilityFlow: v.nullable(v.picklist(balanceSheetFlow, "Valeur invalide")),

    idIncomeStatement: v.nullable(idSchema),

    isMandatory: v.nonNullable(booleanSchema, "Ce champ est requis"),
    isClass: v.nonNullable(booleanSchema, "Ce champ est requis"),
    isSelectable: v.nonNullable(booleanSchema, "Ce champ est requis"),
    isDefault: v.nonNullable(booleanSchema, "Ce champ est requis"),
    number: v.nonNullable(varcharSchema({ maxLength: 32 }), "Ce champ est requis"),
    label: v.nonNullable(varcharSchema({ maxLength: 256 }), "Ce champ est requis"),
    type: v.nonNullable(v.picklist(accountType, "Valeur invalide"), "Ce champ est requis"),

    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof accountModel.$inferSelect>

export const accountSchemaReturn = v.pick(accountSchema, [
    "id",
    "idOrganization",
    "idYear",
    "idAccountParent",

    "idBalanceSheetAsset",
    "balanceSheetAssetColumn",
    "balanceSheetAssetFlow",

    "idBalanceSheetLiability",
    "balanceSheetLiabilityColumn",
    "balanceSheetLiabilityFlow",

    "idIncomeStatement",

    "isMandatory",
    "isClass",
    "isSelectable",
    "isDefault",
    "number",
    "label",
    "type",

    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
