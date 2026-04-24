import * as v from "valibot"
import { dateTimeSchema, integerSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { organizationSubscriptionStatus } from "../components/values/organizationSubscriptionStatus.js"
import { organizationSubscriptionType } from "../components/values/organizationSubscriptionType.js"
import type { organizationSubscriptionModel } from "../models/organizationSubscription.js"

export const organizationSubscriptionSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    type: v.nonNullable(v.picklist(organizationSubscriptionType, "Valeur invalide"), "Ce champ est requis"),
    quantity: v.nonNullable(integerSchema, "Ce champ est requis"),
    amountInCents: v.nonNullable(integerSchema, "Ce champ est requis"),
    mollieSubscriptionId: v.nullable(v.string()),
    status: v.nonNullable(v.picklist(organizationSubscriptionStatus, "Valeur invalide"), "Ce champ est requis"),
    startsAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    endsAt: v.nullable(dateTimeSchema),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof organizationSubscriptionModel.$inferSelect>

export const organizationSubscriptionSchemaReturn = v.pick(organizationSubscriptionSchema, [
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
