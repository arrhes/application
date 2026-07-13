import { relations } from "drizzle-orm"
import { type AnyPgColumn, numeric, pgTable, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { inventoryItemModel } from "./inventoryItem.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

export const inventoryMovementModel = pgTable("table_inventory_movement", {
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
    idInventoryItem: idColumn("id_inventory_item")
        .references(() => inventoryItemModel.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .notNull(),

    quantityChange: numeric("quantity_change", {
        precision: 10,
        scale: 2,
    }).notNull(),
    unitPriceAtMovement: numeric("unit_price_at_movement", {
        precision: 10,
        scale: 2,
    }),
    reference: varchar("reference", {
        length: 256,
    }),
    reason: varchar("reason", {
        length: 256,
    }),
    movementDate: dateTimeColumn("movement_date").notNull(),

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

export const inventoryMovementRelations = relations(inventoryMovementModel, ({ one }) => ({
    inventoryItem: one(inventoryItemModel, {
        fields: [
            inventoryMovementModel.idInventoryItem,
        ],
        references: [
            inventoryItemModel.id,
        ],
    }),
}))
