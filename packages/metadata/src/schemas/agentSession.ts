import * as v from "valibot"
import { dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { agentSessionModel } from "../models/agentSession.js"

export const agentSessionSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idOrganization: v.nonNullable(idSchema, "Ce champ est requis"),
    idUser: v.nonNullable(idSchema, "Ce champ est requis"),
    title: v.nullable(v.string()),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
    lastUpdatedAt: v.nullable(dateTimeSchema),
}) satisfies v.GenericSchema<typeof agentSessionModel.$inferSelect>

export const agentSessionSchemaReturn = v.pick(agentSessionSchema, [
    "id",
    "idOrganization",
    "idUser",
    "title",
    "createdAt",
    "lastUpdatedAt",
])
