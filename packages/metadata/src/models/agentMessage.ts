import { relations } from "drizzle-orm"
import { index, jsonb, pgEnum, pgTable, text } from "drizzle-orm/pg-core"
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
        state: agentMessageStateEnum("state").notNull(),
        streamKey: text("stream_key"),
        createdAt: dateTimeColumn("created_at").notNull(),
    },
    (t) => [index().on(t.idAgentSession)],
)

// Relations
export const agentMessageRelations = relations(agentMessageModel, ({ one }) => ({
    agentSession: one(agentSessionModel, {
        fields: [agentMessageModel.idAgentSession],
        references: [agentSessionModel.id],
    }),
}))
