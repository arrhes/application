import { relations } from "drizzle-orm"
import { index, pgEnum, pgTable } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { agentMessageModel } from "./agentMessage.js"

// Enums
export const workerJobStatusEnum = pgEnum("enum_worker_job_status", [
    "pending",
    "running",
    "completed",
    "error",
    "cancelled",
])

// Model
export const workerJobModel = pgTable(
    "table_worker_job",
    {
        id: idColumn("id").primaryKey(),
        idAgentMessage: idColumn("id_agent_message")
            .references(() => agentMessageModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        status: workerJobStatusEnum("status").notNull().default("pending"),
        createdAt: dateTimeColumn("created_at").notNull(),
        lastUpdatedAt: dateTimeColumn("last_updated_at"),
    },
    (t) => [index().on(t.idAgentMessage)],
)

// Relations
export const workerJobRelations = relations(workerJobModel, ({ one }) => ({
    agentMessage: one(agentMessageModel, {
        fields: [workerJobModel.idAgentMessage],
        references: [agentMessageModel.id],
    }),
}))
