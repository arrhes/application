import * as v from "valibot"
import { dateTimeSchema, integerSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { organizationBillingStatus } from "../components/values/organizationBillingStatus.js"
import { organizationBillingType } from "../components/values/organizationBillingType.js"
import type { organizationBillingModel } from "../models/organizationBilling.js"

export const organizationBillingSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    type: v.nonNullable(v.picklist(organizationBillingType, "Valeur invalide"), "Ce champ est requis"),
    quantity: v.nonNullable(integerSchema, "Ce champ est requis"),
    amountInCents: v.nonNullable(integerSchema, "Ce champ est requis"),
    mollieSubscriptionId: v.nullable(v.string()),
    status: v.nonNullable(v.picklist(organizationBillingStatus, "Valeur invalide"), "Ce champ est requis"),
    startsAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    endsAt: v.nullable(dateTimeSchema),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof organizationBillingModel.$inferSelect>

export const organizationBillingSchemaReturn = v.pick(organizationBillingSchema, [
    "id",
    "idOrganization",
    "type",
    "quantity",
    "amountInCents",
    "status",
    "startsAt",
    "endsAt",
    "createdAt",
])
