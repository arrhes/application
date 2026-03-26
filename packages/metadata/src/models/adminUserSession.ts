import { relations } from "drizzle-orm"
import { boolean, index, pgTable, text } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { adminUserModel } from "./adminUser.js"

// Model
export const adminUserSessionModel = pgTable(
    "table_admin_user_session",
    {
        id: idColumn("id").primaryKey(),
        idAdminUser: idColumn("id_admin_user")
            .references(() => adminUserModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        isActive: boolean("is_active").notNull(),
        expiresAt: dateTimeColumn("expires_at").notNull(),
        ip: text("ip"),
        createdAt: dateTimeColumn("created_at").notNull(),
        lastUpdatedAt: dateTimeColumn("last_updated_at"),
    },
    (t) => [index().on(t.idAdminUser)],
)

// Relations
export const adminUserSessionRelations = relations(adminUserSessionModel, ({ one }) => ({
    adminUser: one(adminUserModel, {
        fields: [adminUserSessionModel.idAdminUser],
        references: [adminUserModel.id],
    }),
}))
