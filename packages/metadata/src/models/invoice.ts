import { relations } from "drizzle-orm"
import { index, integer, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { invoiceStatus } from "../components/values/invoiceStatus.js"
import { organizationModel } from "./organization.js"

// Model
export const invoiceModel = pgTable(
    "table_invoice",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            })
            .notNull(),
        reference: text("reference").notNull(),
        startingAt: dateTimeColumn("starting_at").notNull(),
        endingAt: dateTimeColumn("ending_at").notNull(),
        amountInCents: integer("amount_in_cents").notNull(),
        currency: varchar("currency", {
            length: 3,
        })
            .notNull()
            .default("EUR"),
        xmlStorageKey: text("storage_key"),
        status: varchar("status", {
            length: 16,
            enum: invoiceStatus,
        })
            .notNull()
            .default("draft"),
        createdAt: dateTimeColumn("created_at").notNull(),
        lastUpdatedAt: dateTimeColumn("last_updated_at"),
    },
    (t) => [
        index().on(t.idOrganization),
    ],
)

// Relations
export const invoiceRelations = relations(invoiceModel, ({ one }) => ({
    organization: one(organizationModel, {
        fields: [
            invoiceModel.idOrganization,
        ],
        references: [
            organizationModel.id,
        ],
    }),
}))
