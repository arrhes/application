import { relations } from "drizzle-orm"
import { pgEnum, pgTable } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { ticketStatus } from "../components/values/ticketStatus.js"
import { ticketType } from "../components/values/ticketType.js"
import { dashboardUserModel } from "./dashboardUser.js"
import { ticketMessageModel } from "./ticketMessage.js"

// Enums
export const ticketStatusEnum = pgEnum("enum_ticket_status", ticketStatus)
export const ticketTypeEnum = pgEnum("enum_ticket_type", ticketType)

// Model
export const ticketModel = pgTable("table_ticket", {
    id: idColumn("id").primaryKey(),
    idUser: idColumn("id_user")
        .references(() => dashboardUserModel.id, { onDelete: "cascade", onUpdate: "cascade" })
        .notNull(),
    category: ticketTypeEnum("category").notNull(),
    status: ticketStatusEnum("status").notNull(),
    createdAt: dateTimeColumn("created_at").notNull(),
    lastUpdatedAt: dateTimeColumn("last_updated_at"),
})

// Relations
export const ticketRelations = relations(ticketModel, ({ one, many }) => ({
    user: one(dashboardUserModel, {
        fields: [ticketModel.idUser],
        references: [dashboardUserModel.id],
    }),
    messages: many(ticketMessageModel),
}))
