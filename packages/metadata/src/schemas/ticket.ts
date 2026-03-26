import * as v from "valibot"
import { dateTimeSchema, ticketStatus, ticketType } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { ticketModel } from "../models/ticket.js"

export const ticketSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idUser: v.nonNullable(idSchema, "Ce champ est requis"),
    category: v.nonNullable(v.picklist(ticketType, "Valeur invalide"), "Ce champ est requis"),
    status: v.nonNullable(v.picklist(ticketStatus, "Valeur invalide"), "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof ticketModel.$inferSelect>

export const ticketSchemaReturn = v.pick(ticketSchema, [
    "id",
    "idUser",
    "category",
    "status",
    "createdAt",
    "lastUpdatedAt",
])
