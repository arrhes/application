import { relations } from "drizzle-orm"
import { index, integer, jsonb, pgTable, text } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { agentMessageModel } from "./agentMessage.js"
import { dashboardUserModel } from "./dashboardUser.js"
import { organizationModel } from "./organization.js"

// Model
export const agentSessionModel = pgTable(
    "table_agent_session",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idUser: idColumn("id_user")
            .references(() => dashboardUserModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        title: text("title"),
        idYear: idColumn("id_year"),
        customInstructions: text("custom_instructions"),
        attachedFiles: jsonb("attached_files"),
        totalPromptTokens: integer("total_prompt_tokens").notNull().default(0),
        totalCompletionTokens: integer("total_completion_tokens").notNull().default(0),
        totalTokens: integer("total_tokens").notNull().default(0),
        createdAt: dateTimeColumn("created_at").notNull(),
        lastUpdatedAt: dateTimeColumn("last_updated_at"),
    },
    (t) => [index().on(t.idOrganization, t.idUser)],
)

// Relations
export const agentSessionRelations = relations(agentSessionModel, ({ one, many }) => ({
    organization: one(organizationModel, {
        fields: [agentSessionModel.idOrganization],
        references: [organizationModel.id],
    }),
    user: one(dashboardUserModel, {
        fields: [agentSessionModel.idUser],
        references: [dashboardUserModel.id],
    }),
    messages: many(agentMessageModel),
}))
