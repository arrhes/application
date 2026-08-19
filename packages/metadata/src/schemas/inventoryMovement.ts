import * as v from "valibot"
import { dateTimeSchema, numericSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { inventoryMovementModel } from "../models/inventoryMovement.js"

export const inventoryMovementSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),
    idInventoryItem: v.nonNullable(idSchema, "Ce champ est requis"),

    quantityChange: v.nonNullable(numericSchema, "Ce champ est requis"),
    unitPriceAtMovement: v.nullable(numericSchema),
    reference: v.nullable(
        varcharSchema({
            maxLength: 256,
        }),
    ),
    reason: v.nullable(
        varcharSchema({
            maxLength: 256,
        }),
    ),
    movementDate: v.nonNullable(dateTimeSchema, "Ce champ est requis"),

    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof inventoryMovementModel.$inferSelect>

export const inventoryMovementSchemaReturn = v.pick(inventoryMovementSchema, [
    "id",
    "idOrganization",
    "idYear",
    "idInventoryItem",

    "quantityChange",
    "unitPriceAtMovement",
    "reference",
    "reason",
    "movementDate",

    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
