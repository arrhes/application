import { relations } from "drizzle-orm"
import { index, integer, jsonb, pgTable, text } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { agentMessageModel } from "./agentMessage.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

// Model
export const agentSessionModel = pgTable(
    "table_agent_session",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idUser: idColumn("id_user")
            .references(() => userModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        title: text("title"),
        idYear: idColumn("id_year").references(() => yearModel.id, { onDelete: "set null", onUpdate: "cascade" }),
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
    user: one(userModel, {
        fields: [agentSessionModel.idUser],
        references: [userModel.id],
    }),
    messages: many(agentMessageModel),
}))
