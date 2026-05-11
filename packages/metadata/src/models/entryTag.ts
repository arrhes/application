import { relations } from "drizzle-orm"
import { index, pgTable, unique } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { entryModel } from "./entry.js"
import { organizationModel } from "./organization.js"
import { tagModel } from "./tag.js"
import { yearModel } from "./year.js"

// Model
export const entryTagModel = pgTable(
    "table_entry_tag",
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
        idEntry: idColumn("id_entry")
            .references(() => entryModel.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            })
            .notNull(),
        idTag: idColumn("id_tag")
            .references(() => tagModel.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            })
            .notNull(),
        createdAt: dateTimeColumn("created_at").notNull(),
    },
    (t) => [
        unique().on(t.idEntry, t.idTag),
        index().on(t.idOrganization, t.idYear),
        index().on(t.idEntry),
        index().on(t.idTag),
    ],
)

// Relations
export const entryTagRelations = relations(entryTagModel, ({ one }) => ({
    entry: one(entryModel, {
        fields: [
            entryTagModel.idEntry,
        ],
        references: [
            entryModel.id,
        ],
    }),
    tag: one(tagModel, {
        fields: [
            entryTagModel.idTag,
        ],
        references: [
            tagModel.id,
        ],
    }),
}))
