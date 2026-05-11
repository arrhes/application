import { relations } from "drizzle-orm"
import { type AnyPgColumn, boolean, pgTable, unique, varchar } from "drizzle-orm/pg-core"
import { accountType, balanceSheetFlow } from "../components/index.js"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { balanceSheetColumn } from "../components/values/balanceSheetColumn.js"
import { balanceSheetModel } from "./balanceSheet.js"
import { entryLineModel } from "./entryLine.js"
import { incomeStatementModel } from "./incomeStatement.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

export const accountModel = pgTable(
    "table_account",
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
        idAccountParent: idColumn("id_account_parent").references((): AnyPgColumn => accountModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),

        idBalanceSheetAsset: idColumn("id_balance_sheet_asset").references(() => balanceSheetModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),
        balanceSheetAssetColumn: varchar("balance_sheet_asset_column", {
            length: 32,
            enum: balanceSheetColumn,
        }),
        balanceSheetAssetFlow: varchar("balance_sheet_asset_flow", {
            length: 32,
            enum: balanceSheetFlow,
        }),

        idBalanceSheetLiability: idColumn("id_balance_sheet_liability").references(() => balanceSheetModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),
        balanceSheetLiabilityColumn: varchar("balance_sheet_liability_column", {
            length: 32,
            enum: balanceSheetColumn,
        }),
        balanceSheetLiabilityFlow: varchar("balance_sheet_liability_flow", {
            length: 32,
            enum: balanceSheetFlow,
        }),

        idIncomeStatement: idColumn("id_income_statement").references(() => incomeStatementModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),

        isOptional: boolean("is_optional").notNull(),
        isSelectable: boolean("is_selectable").notNull(),
        isDefault: boolean("is_default").notNull(),
        number: varchar("number", {
            length: 32,
        }).notNull(),
        label: varchar("label", {
            length: 256,
        }).notNull(),
        type: varchar("type", {
            length: 16,
            enum: accountType,
        }).notNull(),

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
    (t) => [
        unique().on(t.idOrganization, t.idYear, t.number),
    ],
)

// Relations
export const accountRelations = relations(accountModel, ({ one, many }) => ({
    balanceSheetAsset: one(balanceSheetModel, {
        fields: [
            accountModel.idBalanceSheetAsset,
        ],
        references: [
            balanceSheetModel.id,
        ],
    }),
    balanceSheetLiability: one(balanceSheetModel, {
        fields: [
            accountModel.idBalanceSheetLiability,
        ],
        references: [
            balanceSheetModel.id,
        ],
    }),
    incomeStatement: one(incomeStatementModel, {
        fields: [
            accountModel.idIncomeStatement,
        ],
        references: [
            incomeStatementModel.id,
        ],
    }),
    lines: many(entryLineModel),
}))
