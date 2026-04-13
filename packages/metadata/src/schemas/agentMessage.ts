import * as v from "valibot"
import { dateTimeSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { agentMessageModel } from "../models/agentMessage.js"

const agentMessageState = ["completed", "streaming", "error"] as const

export const agentMessageSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
    userMessage: v.nonNullable(v.string(), "Ce champ est requis"),
    content: v.nullable(v.string()),
    toolCalls: v.nullable(v.any()),
    toolResults: v.nullable(v.any()),
    usedTools: v.nullable(v.array(v.string())),
    state: v.nonNullable(v.picklist(agentMessageState, "Valeur invalide"), "Ce champ est requis"),
    streamKey: v.nullable(v.string()),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
}) satisfies v.GenericSchema<typeof agentMessageModel.$inferSelect>

export const agentMessageSchemaReturn = v.pick(agentMessageSchema, [
    "id",
    "idAgentSession",
    "userMessage",
    "content",
    "toolCalls",
    "toolResults",
    "usedTools",
    "state",
    "streamKey",
    "createdAt",
])
