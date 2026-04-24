import { relations } from "drizzle-orm"
import { index, integer, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { invoiceStatus } from "../components/values/invoiceStatus.js"
import { organizationModel } from "./organization.js"

// Enums
export const invoiceStatusEnum = pgEnum("enum_invoice_status", invoiceStatus)

// Model
export const invoiceModel = pgTable(
    "table_invoice",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        invoiceNumber: text("invoice_number").notNull(),
        periodStart: dateTimeColumn("period_start").notNull(),
        periodEnd: dateTimeColumn("period_end").notNull(),
        amountInCents: integer("amount_in_cents").notNull(),
        currency: varchar("currency", { length: 3 }).notNull().default("EUR"),
        storageKey: text("storage_key"),
        status: invoiceStatusEnum("status").notNull().default("draft"),
        createdAt: dateTimeColumn("created_at").notNull(),
        lastUpdatedAt: dateTimeColumn("last_updated_at"),
    },
    (t) => [index().on(t.idOrganization)],
)

// Relations
export const invoiceRelations = relations(invoiceModel, ({ one }) => ({
    organization: one(organizationModel, {
        fields: [invoiceModel.idOrganization],
        references: [organizationModel.id],
    }),
}))
