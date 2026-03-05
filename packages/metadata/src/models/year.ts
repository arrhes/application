import { type AnyPgColumn, boolean, pgTable, unique, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"

// Model
export const yearModel = pgTable(
    "table_year",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idYearPrevious: idColumn("id_year_previous").references((): AnyPgColumn => yearModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),
        // isGenerated: boolean("is_generated").notNull(),
        isClosed: boolean("is_closed").notNull(),
        closedAt: dateTimeColumn("closed_at"),
        label: varchar("label", { length: 256 }).notNull(),
        startingAt: dateTimeColumn("starting_at").notNull(),
        endingAt: dateTimeColumn("ending_at").notNull(),
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
    (t) => [unique().on(t.idOrganization, t.idYearPrevious)],
)
