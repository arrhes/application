import { relations } from "drizzle-orm"
import { type AnyPgColumn, bigint, boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { organizationScope } from "../components/index.js"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { invoiceModel } from "./invoice.js"
import { organizationBillingModel } from "./organizationBilling.js"
import { organizationPaymentModel } from "./organizationPayment.js"
import { organizationUserModel } from "./organizationUser.js"
import { userModel } from "./user.js"

export const organizationModel = pgTable("table_organization", {
    id: idColumn("id").primaryKey(),
    isArchived: boolean("is_archived").notNull(),
    scope: varchar("scope", { length: 32, enum: organizationScope }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    siren: text("siren"),
    email: text("email"),
    mollieCustomerId: text("mollie_customer_id"),
    mollieSubscriptionId: text("mollie_subscription_id"),
    subcriptionEndingAt: dateTimeColumn("subscription_ending_at"),
    licenceAmount: integer("licence_amount").notNull().default(0),
    pendingLicenceAmount: integer("pending_licence_amount"),
    pendingStorageMaxUsage: bigint("pending_storage_max_usage", { mode: "number" }),
    walletBalanceInCents: integer("wallet_balance_in_cents").notNull().default(0),
    storageLimit: bigint("storage_limit", { mode: "number" }).notNull().default(1_073_741_824),
    storageMaxUsage: bigint("storage_max_usage", { mode: "number" }).notNull().default(1_073_741_824),
    storageCurrentUsage: bigint("storage_current_usage", { mode: "number" }).notNull().default(0),
    usageMonthStartAt: dateTimeColumn("usage_month_start_at"),
    ocrCurrentMonthPagesUsage: integer("ocr_current_month_pages_usage").notNull().default(0),
    agentTokensCurrentMonthUsage: integer("agent_tokens_current_month_usage").notNull().default(0),
    ocrMonthlyLimit: integer("ocr_monthly_limit").notNull().default(100),
    agentTokensMonthlyLimit: integer("agent_tokens_monthly_limit").notNull().default(1_000_000),
    ocrPagesTotalLeft: integer("ocr_pages_total_left").notNull().default(100),
    ocrPagesTotalUsed: integer("ocr_pages_total_used").notNull().default(0),
    tokensTotalLeft: integer("tokens_total_left").notNull().default(1_000_000),
    tokensTotalUsed: integer("tokens_total_used").notNull().default(0),
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
export const organizationRelations = relations(organizationModel, ({ many }) => ({
    organizationUsers: many(organizationUserModel),
    organizationPayments: many(organizationPaymentModel),
    organizationSubscriptions: many(organizationBillingModel),
    invoices: many(invoiceModel),
}))
