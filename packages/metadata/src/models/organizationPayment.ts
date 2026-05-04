import { relations } from "drizzle-orm"
import { type AnyPgColumn, integer, pgTable, text, varchar } from "drizzle-orm/pg-core"
import {
    organizationBillingType,
    organizationPaymentCategory,
    organizationPaymentFlow,
    organizationPaymentStatus,
} from "../components/index.js"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { invoiceModel } from "./invoice.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"

// Model
export const organizationPaymentModel = pgTable("table_organization_payment", {
    id: idColumn("id").primaryKey(),
    idOrganization: idColumn("id_organization")
        .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
        .notNull(),
    category: varchar("category", { length: 32, enum: organizationPaymentCategory }).notNull().default("subscription"),
    flow: varchar("flow", { length: 16, enum: organizationPaymentFlow }).notNull(),
    status: varchar("status", { length: 16, enum: organizationPaymentStatus }).notNull(),
    molliePaymentId: text("mollie_payment_id"),
    sequenceType: varchar("sequence_type", { length: 16 }),
    serviceType: varchar("service_type", { length: 32, enum: organizationBillingType }),
    quantity: integer("quantity").notNull().default(1),
    unitAmountHTInCents: integer("unit_amount_ht_in_cents").notNull().default(0),
    amountHTInCents: integer("amount_ht_in_cents").notNull().default(0),
    amountTVAInCents: integer("amount_tva_in_cents").notNull().default(0),
    currency: varchar("currency", { length: 3 }).notNull(),
    description: text("description"),
    periodStart: dateTimeColumn("period_start"),
    periodEnd: dateTimeColumn("period_end"),
    paidAt: dateTimeColumn("paid_at"),
    idInvoice: idColumn("id_invoice").references((): AnyPgColumn => invoiceModel.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
    }).notNull(),
    createdAt: dateTimeColumn("created_at").notNull(),
    lastUpdatedAt: dateTimeColumn("last_updated_at"),
    createdBy: idColumn("created_by").references((): AnyPgColumn => userModel.id, {
        onDelete: "set null",
        onUpdate: "cascade",
    }),
    lastUpdatedBy: idColumn("last_updated_by").references((): AnyPgColumn => userModel.id, {
        onDelete: "set null",
        onUpdate: "cascade",
    }),
})

// Relations
export const organizationPaymentRelations = relations(organizationPaymentModel, ({ one }) => ({
    organization: one(organizationModel, {
        fields: [organizationPaymentModel.idOrganization],
        references: [organizationModel.id],
    }),
    invoice: one(invoiceModel, {
        fields: [organizationPaymentModel.idInvoice],
        references: [invoiceModel.id],
    }),
}))
