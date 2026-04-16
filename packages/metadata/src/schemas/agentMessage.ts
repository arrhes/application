import * as v from "valibot"
import { dateTimeSchema, integerSchema } from "../components/index.js"
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
    attachedFiles: v.nullable(v.any()),
    state: v.nonNullable(v.picklist(agentMessageState, "Valeur invalide"), "Ce champ est requis"),
    streamKey: v.nullable(v.string()),
    promptTokens: v.nullable(integerSchema),
    completionTokens: v.nullable(integerSchema),
    totalTokens: v.nullable(integerSchema),
    subagentRole: v.nullable(v.string()),
    subagentDepth: v.nonNullable(integerSchema, "Ce champ est requis"),
    idParentAgentMessage: v.nullable(idSchema),
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
    "attachedFiles",
    "state",
    "streamKey",
    "createdAt",
])
