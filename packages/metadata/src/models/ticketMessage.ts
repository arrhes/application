import { relations } from "drizzle-orm"
import { type AnyPgColumn, index, pgTable, text } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { adminUserModel } from "./adminUser.js"
import { ticketModel } from "./ticket.js"
import { dashboardUserModel } from "./dashboardUser.js"

// Model
export const ticketMessageModel = pgTable(
    "table_ticket_message",
    {
        id: idColumn("id").primaryKey(),
        idTicket: idColumn("id_ticket")
            .references(() => ticketModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idUser: idColumn("id_user").references((): AnyPgColumn => dashboardUserModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),
        idAdminUser: idColumn("id_admin_user").references((): AnyPgColumn => adminUserModel.id, {
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
    user: one(dashboardUserModel, {
        fields: [ticketMessageModel.idUser],
        references: [dashboardUserModel.id],
    }),
    adminUser: one(adminUserModel, {
        fields: [ticketMessageModel.idAdminUser],
        references: [adminUserModel.id],
    }),
}))
