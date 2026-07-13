import * as v from "valibot"
import { dateTimeSchema, numericSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import { varcharSchema } from "../components/schemas/varcharSchema.js"
import type { inventoryItemModel } from "../models/inventoryItem.js"

export const inventoryItemSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idYear: v.nonNullable(idSchema, "Ce champ est requis"),

    sku: v.nullable(
        varcharSchema({
            maxLength: 64,
        }),
    ),
    name: v.nonNullable(
        varcharSchema({
            maxLength: 256,
        }),
        "Ce champ est requis",
    ),
    description: v.nullable(
        varcharSchema({
            maxLength: 1024,
        }),
    ),
    category: v.nullable(
        varcharSchema({
            maxLength: 256,
        }),
    ),
    unit: v.nonNullable(
        varcharSchema({
            maxLength: 32,
        }),
        "Ce champ est requis",
    ),
    unitPrice: v.nullable(numericSchema),
    currentQuantity: v.nonNullable(numericSchema, "Ce champ est requis"),
    minimumThreshold: v.nullable(numericSchema),
    location: v.nullable(
        varcharSchema({
            maxLength: 256,
        }),
    ),

    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
    createdBy: v.nullable(idSchema),
    lastUpdatedBy: v.nullable(idSchema),
}) satisfies v.GenericSchema<typeof inventoryItemModel.$inferSelect>

export const inventoryItemSchemaReturn = v.pick(inventoryItemSchema, [
    "id",
    "idOrganization",
    "idYear",

    "sku",
    "name",
    "description",
    "category",
    "unit",
    "unitPrice",
    "currentQuantity",
    "minimumThreshold",
    "location",

    "createdAt",
    "lastUpdatedAt",
    "createdBy",
    "lastUpdatedBy",
])
