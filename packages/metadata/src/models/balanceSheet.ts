import { relations } from "drizzle-orm"
import { type AnyPgColumn, boolean, pgEnum, pgTable, unique, varchar } from "drizzle-orm/pg-core"
import { balanceSheetSide } from "../components/index.js"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { accountModel } from "./account.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"
import { yearModel } from "./year.js"

// Model
export const balanceSheetSideEnum = pgEnum("enum_balance_sheet_side", balanceSheetSide)

export const balanceSheetModel = pgTable(
    "table_balance_sheet",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idYear: idColumn("id_year")
            .references(() => yearModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idBalanceSheetParent: idColumn("id_balance_sheet_parent").references((): AnyPgColumn => balanceSheetModel.id, {
            onDelete: "set null",
            onUpdate: "cascade",
        }),
        isDefault: boolean("is_default").notNull(),
        isComputed: boolean("is_total").notNull(),
        side: balanceSheetSideEnum("side").notNull(),
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
    (t) => [unique().on(t.idOrganization, t.idYear, t.side, t.number)],
)

// Relations
export const balanceSheetRelations = relations(balanceSheetModel, ({ many }) => ({
    accounts: many(accountModel),
}))
