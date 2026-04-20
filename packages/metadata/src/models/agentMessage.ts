import { relations } from "drizzle-orm"
import { type AnyPgColumn, index, integer, jsonb, pgEnum, pgTable, text } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { agentSessionModel } from "./agentSession.js"

// Enums
export const agentMessageStateEnum = pgEnum("enum_agent_message_state", ["completed", "streaming", "error"])

// Model
export const agentMessageModel = pgTable(
    "table_agent_message",
    {
        id: idColumn("id").primaryKey(),
        idAgentSession: idColumn("id_agent_session")
            .references(() => agentSessionModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        userMessage: text("user_message").notNull(),
        content: text("content"),
        toolCalls: jsonb("tool_calls"),
        toolResults: jsonb("tool_results"),
        usedTools: text("used_tools").array(),
        attachedFiles: jsonb("attached_files"),
        references: jsonb("references"),
        state: agentMessageStateEnum("state").notNull(),
        streamKey: text("stream_key"),
        promptTokens: integer("prompt_tokens"),
        completionTokens: integer("completion_tokens"),
        totalTokens: integer("total_tokens"),
        subagentRole: text("subagent_role"),
        subagentDepth: integer("subagent_depth").notNull().default(0),
        idParentAgentMessage: idColumn("id_parent_agent_message").references((): AnyPgColumn => agentMessageModel.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
        createdAt: dateTimeColumn("created_at").notNull(),
    },
    (t) => [index().on(t.idAgentSession), index().on(t.idParentAgentMessage)],
)

// Relations
export const agentMessageRelations = relations(agentMessageModel, ({ one, many }) => ({
    agentSession: one(agentSessionModel, {
        fields: [agentMessageModel.idAgentSession],
        references: [agentSessionModel.id],
    }),
    parentMessage: one(agentMessageModel, {
        fields: [agentMessageModel.idParentAgentMessage],
        references: [agentMessageModel.id],
        relationName: "parentChild",
    }),
    childMessages: many(agentMessageModel, { relationName: "parentChild" }),
}))
