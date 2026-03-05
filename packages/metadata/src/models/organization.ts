import { relations } from "drizzle-orm"
import { type AnyPgColumn, boolean, integer, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { organizationScope } from "../components/index.js"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { organizationPaymentModel } from "./organizationPayment.js"
import { organizationUserModel } from "./organizationUser.js"
import { userModel } from "./user.js"

// Model
export const organizationScopeEnum = pgEnum("enum_organization_scope", organizationScope)

export const organizationModel = pgTable("table_organization", {
    id: idColumn("id").primaryKey(),
    isArchived: boolean("is_archived").notNull(),
    scope: organizationScopeEnum("scope").notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    siren: text("siren"),
    email: text("email"),
    mollieCustomerId: text("mollie_customer_id"),
    mollieSubscriptionId: text("mollie_subscription_id"),
    subcriptionEndingAt: dateTimeColumn("subscription_ending_at"),
    storageLimit: integer("storage_limit").notNull().default(1_073_741_824),
    storageCurrentUsage: integer("storage_current_usage").notNull().default(0),
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
}))
