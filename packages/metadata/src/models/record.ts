import { relations } from "drizzle-orm"
import { type AnyPgColumn, index, pgTable, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { fileModel } from "./file.js"
import { journalModel } from "./journal.js"
import { organizationModel } from "./organization.js"
import { recordLabelModel } from "./recordLabel.js"
import { recordRowModel } from "./recordRow.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

// Model
export const recordModel = pgTable(
    "table_record",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idYear: idColumn("id_year")
            .references(() => yearModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idJournal: idColumn("id_journal").references(() => journalModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),
        idFile: idColumn("id_file").references(() => fileModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),
        idRecordLabel: idColumn("id_record_label").references(() => recordLabelModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),
        label: varchar("label", { length: 256 }).notNull(),
        date: dateTimeColumn("date").notNull(),
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
    (t) => [index().on(t.idOrganization, t.idYear)],
)

// Relations
export const recordRelations = relations(recordModel, ({ many }) => ({
    rows: many(recordRowModel),
}))
