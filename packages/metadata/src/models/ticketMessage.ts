import { relations } from "drizzle-orm"
import { type AnyPgColumn, index, pgTable, text } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { ticketModel } from "./ticket.js"
import { userModel } from "./user.js"

// Model
export const ticketMessageModel = pgTable(
    "table_ticket_message",
    {
        id: idColumn("id").primaryKey(),
        idTicket: idColumn("id_ticket")
            .references(() => ticketModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idUser: idColumn("id_user").references((): AnyPgColumn => userModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),
        idAdminUser: idColumn("id_admin_user").references((): AnyPgColumn => userModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),
        message: text("message").notNull(),
        createdAt: dateTimeColumn("created_at").notNull(),
    },
    (t) => [index().on(t.idTicket)],
)

// Relations
export const ticketMessageRelations = relations(ticketMessageModel, ({ one }) => ({
    ticket: one(ticketModel, {
        fields: [ticketMessageModel.idTicket],
        references: [ticketModel.id],
    }),
    user: one(userModel, {
        fields: [ticketMessageModel.idUser],
        references: [userModel.id],
    }),
    adminUser: one(userModel, {
        fields: [ticketMessageModel.idAdminUser],
        references: [userModel.id],
    }),
}))
