import { relations } from "drizzle-orm"
import { type AnyPgColumn, index, integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { organizationSubscriptionStatus } from "../components/values/organizationSubscriptionStatus.js"
import { organizationSubscriptionType } from "../components/values/organizationSubscriptionType.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"

// Enums
export const organizationSubscriptionStatusEnum = pgEnum(
    "enum_organization_subscription_status",
    organizationSubscriptionStatus,
)

export const organizationSubscriptionTypeEnum = pgEnum(
    "enum_organization_subscription_type",
    organizationSubscriptionType,
)

// Model
export const organizationSubscriptionModel = pgTable(
    "table_organization_subscription",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        type: organizationSubscriptionTypeEnum("type").notNull(),
        quantity: integer("quantity").notNull().default(1),
        amountInCents: integer("amount_in_cents").notNull(),
        mollieSubscriptionId: text("mollie_subscription_id"),
        status: organizationSubscriptionStatusEnum("status").notNull().default("active"),
        startsAt: dateTimeColumn("starts_at").notNull(),
        endsAt: dateTimeColumn("ends_at"),
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
    },
    (t) => [index().on(t.idOrganization)],
)

// Relations
export const organizationSubscriptionRelations = relations(organizationSubscriptionModel, ({ one }) => ({
    organization: one(organizationModel, {
        fields: [organizationSubscriptionModel.idOrganization],
        references: [organizationModel.id],
    }),
}))
