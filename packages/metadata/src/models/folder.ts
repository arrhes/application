import { type AnyPgColumn, pgTable, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

// Model
export const folderModel = pgTable("table_folder", {
    id: idColumn("id").primaryKey(),
    idOrganization: idColumn("id_organization")
        .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
        .notNull(),
    idYear: idColumn("id_year")
        .references(() => yearModel.id, { onDelete: "cascade", onUpdate: "cascade" })
        .notNull(),
    idFolderParent: idColumn("id_folder_parent").references((): AnyPgColumn => folderModel.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    name: varchar("name", { length: 256 }).notNull(),
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
