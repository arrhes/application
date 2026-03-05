import { relations } from "drizzle-orm"
import { type AnyPgColumn, integer, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { organizationPaymentStatus } from "../components/values/organizationPaymentStatus.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"

// Model
export const organizationPaymentStatusEnum = pgEnum("enum_organization_payment_status", organizationPaymentStatus)

export const organizationPaymentModel = pgTable("table_organization_payment", {
    id: idColumn("id").primaryKey(),
    idOrganization: idColumn("id_organization")
        .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
        .notNull(),
    status: organizationPaymentStatusEnum("status").notNull(),
    molliePaymentId: text("mollie_payment_id"),
    mollieSubscriptionId: text("mollie_subscription_id"),
    sequenceType: varchar("sequence_type", { length: 16 }),
    amountInCents: integer("amount_in_cents").notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    description: text("description"),
    periodStart: dateTimeColumn("period_start"),
    periodEnd: dateTimeColumn("period_end"),
    paidAt: dateTimeColumn("paid_at"),
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
}))
