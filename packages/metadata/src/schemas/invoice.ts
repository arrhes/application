import * as v from "valibot"
import { dateTimeSchema, integerSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import { invoiceStatus } from "../components/values/invoiceStatus.js"
import type { invoiceModel } from "../models/invoice.js"

export const invoiceSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    reference: v.nonNullable(v.string(), "Ce champ est requis"),
    periodStart: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    periodEnd: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    amountInCents: v.nonNullable(integerSchema, "Ce champ est requis"),
    currency: v.nonNullable(varcharSchema({ maxLength: 3 }), "Ce champ est requis"),
    xmlStorageKey: v.nullable(v.string()),
    status: v.nonNullable(v.picklist(invoiceStatus, "Valeur invalide"), "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof invoiceModel.$inferSelect>

export const invoiceSchemaReturn = v.pick(invoiceSchema, [
    "id",
    "idOrganization",
    "reference",
    "periodStart",
    "periodEnd",
    "amountInCents",
    "currency",
    "xmlStorageKey",
    "status",
    "createdAt",
])
