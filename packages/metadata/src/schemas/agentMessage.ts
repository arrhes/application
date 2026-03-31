import * as v from "valibot"
import { dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { agentMessageModel } from "../models/agentMessage.js"

const agentMessageRole = ["user", "assistant", "tool"] as const
const agentMessageState = ["completed", "streaming", "error"] as const

export const agentMessageSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
    role: v.nonNullable(v.picklist(agentMessageRole, "Valeur invalide"), "Ce champ est requis"),
    content: v.nullable(v.string()),
    toolCalls: v.nullable(v.any()),
    toolResults: v.nullable(v.any()),
    state: v.nonNullable(v.picklist(agentMessageState, "Valeur invalide"), "Ce champ est requis"),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
}) satisfies v.GenericSchema<typeof agentMessageModel.$inferSelect>

export const agentMessageSchemaReturn = v.pick(agentMessageSchema, [
    "id",
    "idAgentSession",
    "role",
    "content",
    "toolCalls",
    "toolResults",
    "state",
    "createdAt",
])
