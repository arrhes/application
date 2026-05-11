import { relations } from "drizzle-orm"
import { type AnyPgColumn, index, integer, pgTable, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { organizationBillingStatus } from "../components/values/organizationBillingStatus.js"
import { organizationBillingType } from "../components/values/organizationBillingType.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"

// Model
export const organizationBillingModel = pgTable(
    "table_organization_subscription",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            })
            .notNull(),
        type: varchar("type", {
            length: 32,
            enum: organizationBillingType,
        }).notNull(),
        quantity: integer("quantity").notNull().default(1),
        amountInCents: integer("amount_in_cents").notNull(),
        status: varchar("status", {
            length: 16,
            enum: organizationBillingStatus,
        })
            .notNull()
            .default("active"),
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
    (t) => [
        index().on(t.idOrganization),
    ],
)

// Relations
export const organizationBillingRelations = relations(organizationBillingModel, ({ one }) => ({
    organization: one(organizationModel, {
        fields: [
            organizationBillingModel.idOrganization,
        ],
        references: [
            organizationModel.id,
        ],
    }),
}))
