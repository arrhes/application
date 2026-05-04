import { relations } from "drizzle-orm"
import { boolean, index, pgTable, text } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { userModel } from "./user.js"

// Model
export const userSessionModel = pgTable(
    "table_user_session",
    {
        id: idColumn("id").primaryKey(),
        idUser: idColumn("id_user")
            .references(() => userModel.id, { onDelete: "cascade", onUpdate: "cascade" })
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
export const userSessionsRelations = relations(userSessionModel, ({ one }) => ({
    user: one(userModel, {
        fields: [userSessionModel.idUser],
        references: [userModel.id],
    }),
}))
