import { relations } from "drizzle-orm"
import { type AnyPgColumn, integer, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core"
import {
    organizationPaymentCategory,
    organizationPaymentStatus,
    organizationSubscriptionType,
} from "../components/index.js"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { dashboardUserModel } from "./dashboardUser.js"
import { invoiceModel } from "./invoice.js"
import { organizationModel } from "./organization.js"

// Model
export const organizationPaymentStatusEnum = pgEnum("enum_organization_payment_status", organizationPaymentStatus)
export const organizationPaymentCategoryEnum = pgEnum("enum_organization_payment_category", organizationPaymentCategory)

export const organizationPaymentModel = pgTable("table_organization_payment", {
    id: idColumn("id").primaryKey(),
    idOrganization: idColumn("id_organization")
        .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
        .notNull(),
    category: organizationPaymentCategoryEnum("category").notNull().default("subscription"),
    status: organizationPaymentStatusEnum("status").notNull(),
    molliePaymentId: text("mollie_payment_id"),
    mollieSubscriptionId: text("mollie_subscription_id"),
    sequenceType: varchar("sequence_type", { length: 16 }),
    serviceType: varchar("service_type", { length: 32, enum: organizationSubscriptionType }),
    amountInCents: integer("amount_in_cents").notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    description: text("description"),
    periodStart: dateTimeColumn("period_start"),
    periodEnd: dateTimeColumn("period_end"),
    paidAt: dateTimeColumn("paid_at"),
    idInvoice: idColumn("id_invoice").references((): AnyPgColumn => invoiceModel.id, {
        onDelete: "set null",
        onUpdate: "cascade",
    }),
    createdAt: dateTimeColumn("created_at").notNull(),
    lastUpdatedAt: dateTimeColumn("last_updated_at"),
    createdBy: idColumn("created_by").references((): AnyPgColumn => dashboardUserModel.id, {
        onDelete: "set null",
        onUpdate: "cascade",
    }),
    lastUpdatedBy: idColumn("last_updated_by").references((): AnyPgColumn => dashboardUserModel.id, {
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
