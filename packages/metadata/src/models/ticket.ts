import { relations } from "drizzle-orm"
import { pgTable, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { ticketStatus } from "../components/values/ticketStatus.js"
import { ticketType } from "../components/values/ticketType.js"
import { ticketMessageModel } from "./ticketMessage.js"
import { userModel } from "./user.js"

// Model
export const ticketModel = pgTable("table_ticket", {
    id: idColumn("id").primaryKey(),
    idUser: idColumn("id_user")
        .references(() => userModel.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .notNull(),
    category: varchar("category", {
        length: 32,
        enum: ticketType,
    }).notNull(),
    status: varchar("status", {
        length: 16,
        enum: ticketStatus,
    }).notNull(),
    createdAt: dateTimeColumn("created_at").notNull(),
    lastUpdatedAt: dateTimeColumn("last_updated_at"),
})

// Relations
export const ticketRelations = relations(ticketModel, ({ one, many }) => ({
    user: one(userModel, {
        fields: [
            ticketModel.idUser,
        ],
        references: [
            userModel.id,
        ],
    }),
    messages: many(ticketMessageModel),
}))
