import { relations } from "drizzle-orm"
import { type AnyPgColumn, index, integer, pgEnum, pgTable, unique } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { operation } from "../components/values/operation.js"
import { computationModel } from "./computation.js"
import { incomeStatementModel } from "./incomeStatement.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

// Model
export const computationIncomeStatementOperationEnum = pgEnum("enum_computation_incomeStatement_operation", operation)

export const computationIncomeStatementModel = pgTable(
    "table_computation_income_statement",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idYear: idColumn("id_year")
            .references(() => yearModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idComputation: idColumn("id_computation")
            .references(() => computationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idIncomeStatement: idColumn("id_income_statement")
            .references(() => incomeStatementModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        index: integer("index").notNull(),
        operation: computationIncomeStatementOperationEnum("operation").notNull(),
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
    (t) => [unique().on(t.idComputation, t.idIncomeStatement), index().on(t.idOrganization, t.idYear)],
)

// Relations
export const computationIncomeStatementRelations = relations(computationIncomeStatementModel, ({ one }) => ({
    computation: one(computationModel, {
        fields: [computationIncomeStatementModel.idComputation],
        references: [computationModel.id],
    }),
    incomeStatement: one(incomeStatementModel, {
        fields: [computationIncomeStatementModel.idIncomeStatement],
        references: [incomeStatementModel.id],
    }),
}))
