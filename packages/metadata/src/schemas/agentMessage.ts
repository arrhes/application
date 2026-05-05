import * as v from "valibot"
import { dateTimeSchema, integerSchema } from "../components/index.js"
import { idSchema } from "../components/schemas/idSchema.js"
import type { agentMessageModel } from "../models/agentMessage.js"

const agentMessageState = ["completed", "streaming", "error"] as const

export const agentMessageSchema = v.object({
    id: v.nonNullable(idSchema, "Ce champ est requis"),
    idAgentSession: v.nonNullable(idSchema, "Ce champ est requis"),
    userMessage: v.nullable(v.string()),
    input: v.nullable(v.string()),
    output: v.nullable(v.string()),
    toolCalls: v.nullable(v.any()),
    toolResults: v.nullable(v.any()),
    usedTools: v.nullable(v.array(v.string())),
    attachedFiles: v.nullable(v.any()),
    references: v.nullable(v.any()),
    state: v.nonNullable(v.picklist(agentMessageState, "Valeur invalide"), "Ce champ est requis"),
    streamKey: v.nullable(v.string()),
    inputTokens: v.nullable(integerSchema),
    outputTokens: v.nullable(integerSchema),
    depth: v.nonNullable(integerSchema, "Ce champ est requis"),
    idParentAgentMessage: v.nullable(idSchema),
    createdAt: v.nonNullable(dateTimeSchema, "Ce champ est requis"),
}) satisfies v.GenericSchema<typeof agentMessageModel.$inferSelect>

export const agentMessageSchemaReturn = v.pick(agentMessageSchema, [
    "id",
    "idAgentSession",
    "userMessage",
    "input",
    "output",
    "toolCalls",
    "toolResults",
    "usedTools",
    "attachedFiles",
    "references",
    "state",
    "streamKey",
    "createdAt",
])
