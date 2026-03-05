import * as v from "valibot"
import { dateTimeSchema, integerSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import { organizationPaymentStatus } from "../components/values/organizationPaymentStatus.js"
import type { organizationPaymentModel } from "../models/organizationPayment.js"

export const organizationPaymentSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    status: v.nonNullable(v.picklist(organizationPaymentStatus, "Valeur invalide"), "Ce champ est requis"),
    molliePaymentId: v.nullable(v.string()),
    mollieSubscriptionId: v.nullable(v.string()),
    sequenceType: v.nullable(varcharSchema({ maxLength: 16 })),
    amountInCents: v.nonNullable(integerSchema, "Ce champ est requis"),
    currency: v.nonNullable(varcharSchema({ maxLength: 3 }), "Ce champ est requis"),
    description: v.nullable(v.string()),
    periodStart: v.nullable(dateTimeSchema),
    periodEnd: v.nullable(dateTimeSchema),
    paidAt: v.nullable(dateTimeSchema),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof organizationPaymentModel.$inferSelect>

export const organizationPaymentSchemaReturn = v.pick(organizationPaymentSchema, [
    "id",
    "idOrganization",
    "status",
    "molliePaymentId",
    "sequenceType",
    "amountInCents",
    "currency",
    "description",
    "periodStart",
    "periodEnd",
    "paidAt",
    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
