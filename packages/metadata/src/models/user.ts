import { relations } from "drizzle-orm"
import { boolean, index, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { organizationUserModel } from "./organizationUser.js"

// Model
export const userModel = pgTable(
    "table_user",
    {
        id: idColumn("id").primaryKey(),
        isActive: boolean("is_active").notNull(),
        alias: varchar("alias", { length: 256 }),
        email: text("email").notNull().unique(),
        isEmailValidated: boolean("is_email_validated").notNull(),
        emailToValidate: text("email_to_validate"),
        emailToken: text("email_token"),
        emailTokenExpiresAt: dateTimeColumn("email_token_expires_at"),
        passwordHash: text("password_hash").notNull(),
        passwordSalt: text("password_salt").notNull(),
        createdAt: dateTimeColumn("created_at").notNull(),
        lastUpdatedAt: dateTimeColumn("last_updated_at"),
    },
    (t) => [index().on(t.emailToken)],
)

// Relations
export const userRelations = relations(userModel, ({ many }) => ({
    organizationUsers: many(organizationUserModel),
}))
