import { relations } from "drizzle-orm"
import { type AnyPgColumn, numeric, pgTable, unique, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { inventoryMovementModel } from "./inventoryMovement.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

export const inventoryItemModel = pgTable(
    "table_inventory_item",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            })
            .notNull(),
        idYear: idColumn("id_year")
            .references(() => yearModel.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            })
            .notNull(),

        sku: varchar("sku", {
            length: 64,
        }),
        name: varchar("name", {
            length: 256,
        }).notNull(),
        description: varchar("description", {
            length: 1024,
        }),
        category: varchar("category", {
            length: 256,
        }),
        unit: varchar("unit", {
            length: 32,
        }).notNull(),
        unitPrice: numeric("unit_price", {
            precision: 10,
            scale: 2,
        }),
        currentQuantity: numeric("current_quantity", {
            precision: 10,
            scale: 2,
        })
            .notNull()
            .default("0"),
        minimumThreshold: numeric("minimum_threshold", {
            precision: 10,
            scale: 2,
        }),
        location: varchar("location", {
            length: 256,
        }),

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
        unique().on(t.idOrganization, t.idYear, t.sku),
    ],
)

export const inventoryItemRelations = relations(inventoryItemModel, ({ many }) => ({
    movements: many(inventoryMovementModel),
}))
