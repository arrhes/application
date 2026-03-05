import { relations } from "drizzle-orm"
import { type AnyPgColumn, boolean, index, numeric, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { accountModel } from "./account.js"
import { organizationModel } from "./organization.js"
import { recordModel } from "./record.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

// Model
export const recordRowModel = pgTable(
    "table_record_row",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idYear: idColumn("id_year")
            .references(() => yearModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idRecord: idColumn("id_record")
            .references(() => recordModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idAccount: idColumn("id_account")
            .references(() => accountModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        flag: text("flag"),
        isComputedForJournalReport: boolean("is_computed_for_journal_report").notNull(),
        isComputedForLedgerReport: boolean("is_computed_for_ledger_report").notNull(),
        isComputedForBalanceReport: boolean("is_computed_for_balance_report").notNull(),
        isComputedForBalanceSheetReport: boolean("is_computed_for_balance_sheet_report").notNull(),
        isComputedForIncomeStatementReport: boolean("is_computed_for_income_statement_report").notNull(),
        label: varchar("label", { length: 256 }),
        debit: numeric("debit", { scale: 2 }).notNull(),
        credit: numeric("credit", { scale: 2 }).notNull(),
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
    (t) => [index().on(t.idOrganization, t.idYear), index().on(t.idRecord)],
)

// Relations
export const recordRowRelations = relations(recordRowModel, ({ one }) => ({
    record: one(recordModel, {
        fields: [recordRowModel.idRecord],
        references: [recordModel.id],
    }),
    account: one(accountModel, {
        fields: [recordRowModel.idAccount],
        references: [accountModel.id],
    }),
}))
