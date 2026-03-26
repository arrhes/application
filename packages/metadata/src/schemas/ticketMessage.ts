import * as v from "valibot"
import { dateTimeSchema, stringSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { ticketMessageModel } from "../models/ticketMessage.js"

export const ticketMessageSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idTicket: v.nonNullable(idSchema, "Ce champ est requis"),
    idUser: v.nullable(idSchema),
    idAdminUser: v.nullable(idSchema),
    message: v.nonNullable(stringSchema, "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
}) satisfies v.GenericSchema<typeof ticketMessageModel.$inferSelect>

export const ticketMessageSchemaReturn = v.pick(ticketMessageSchema, [
    "id",
    "idTicket",
    "idUser",
    "idAdminUser",
    "message",
    "createdAt",
])
