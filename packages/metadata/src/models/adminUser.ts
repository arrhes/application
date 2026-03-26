import { relations } from "drizzle-orm"
import { boolean, pgTable, text } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"

// Model
export const adminUserModel = pgTable("table_admin_user", {
    id: idColumn("id").primaryKey(),
    isActive: boolean("is_active").notNull(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    passwordSalt: text("password_salt").notNull(),
    createdAt: dateTimeColumn("created_at").notNull(),
    lastUpdatedAt: dateTimeColumn("last_updated_at"),
})

// Relations
export const adminUserRelations = relations(adminUserModel, () => ({}))
