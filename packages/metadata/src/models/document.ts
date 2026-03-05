import { relations } from "drizzle-orm"
import { type AnyPgColumn, index, pgEnum, pgTable, text } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { documentType } from "../components/values/documentType.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

// Model
export const documentTypeEnum = pgEnum("enum_document_type", documentType)

export const documentModel = pgTable(
    "table_document",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idYear: idColumn("id_year")
            .references(() => yearModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        label: text("label").notNull(),
        type: documentTypeEnum("type").notNull(),
        storageKey: text("storage_key").notNull(),
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
export const documentRelations = relations(documentModel, (_args) => ({}))
