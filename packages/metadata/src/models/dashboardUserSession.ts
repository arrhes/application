import { relations } from "drizzle-orm"
import { boolean, index, pgTable, text } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { dashboardUserModel } from "./dashboardUser.js"

// Model
export const dashboardUserSessionModel = pgTable(
    "table_dashboard_user_session",
    {
        id: idColumn("id").primaryKey(),
        idUser: idColumn("id_user")
            .references(() => dashboardUserModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        isActive: boolean("is_active").notNull(),
        expiresAt: dateTimeColumn("expires_at").notNull(),
        ip: text("ip"),
        createdAt: dateTimeColumn("created_at").notNull(),
        lastUpdatedAt: dateTimeColumn("last_updated_at"),
    },
    (t) => [index().on(t.idUser)],
)

// Relations
export const dashboardUserSessionsRelations = relations(dashboardUserSessionModel, ({ one }) => ({
    user: one(dashboardUserModel, {
        fields: [dashboardUserSessionModel.idUser],
        references: [dashboardUserModel.id],
    }),
}))
