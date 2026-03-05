import { relations } from "drizzle-orm"
import { boolean, index, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"

// Model
export const apiKeyModel = pgTable(
    "table_api_key",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        idUser: idColumn("id_user")
            .references(() => userModel.id, { onDelete: "cascade", onUpdate: "cascade" })
            .notNull(),
        keyHash: text("key_hash").notNull(),
        name: varchar("name", { length: 256 }).notNull(),
        isDefault: boolean("is_default").notNull(),
        isActive: boolean("is_active").notNull(),
        createdAt: dateTimeColumn("created_at").notNull(),
        lastUpdatedAt: dateTimeColumn("last_updated_at"),
    },
    (t) => [index().on(t.idOrganization), index().on(t.idUser), index().on(t.keyHash)],
)

// Relations
export const apiKeyRelations = relations(apiKeyModel, ({ one }) => ({
    organization: one(organizationModel, {
        fields: [apiKeyModel.idOrganization],
        references: [organizationModel.id],
    }),
    user: one(userModel, {
        fields: [apiKeyModel.idUser],
        references: [userModel.id],
    }),
}))
