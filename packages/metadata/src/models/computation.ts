import { relations } from "drizzle-orm"
import { type AnyPgColumn, integer, pgTable, unique, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { computationIncomeStatementModel } from "./computationIncomeStatement.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

// Model
export const computationModel = pgTable(
    "table_computation",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idYear: idColumn("id_year")
            .references(() => yearModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        index: integer("index").notNull(),
        number: varchar("number", { length: 32 }).notNull(),
        label: varchar("label", { length: 256 }).notNull(),
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
    (t) => [unique().on(t.idOrganization, t.idYear, t.number)],
)

// Relations
export const computationRelations = relations(computationModel, ({ many }) => ({
    computationIncomeStatements: many(computationIncomeStatementModel),
}))
