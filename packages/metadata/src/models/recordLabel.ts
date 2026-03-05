import { relations } from "drizzle-orm"
import { type AnyPgColumn, pgTable, unique, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { organizationModel } from "./organization.js"
import { recordModel } from "./record.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

// Model
export const recordLabelModel = pgTable(
    "table_record_label",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idYear: idColumn("id_year")
            .references(() => yearModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),

        label: varchar("label", { length: 256 }).notNull().unique(),

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
    (t) => [unique().on(t.idOrganization, t.idYear, t.label)],
)

// Relations
export const recordLabelRelations = relations(recordLabelModel, ({ many }) => ({
    records: many(recordModel),
}))
