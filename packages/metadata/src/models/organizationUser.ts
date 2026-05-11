import { relations } from "drizzle-orm"
import { type AnyPgColumn, boolean, index, pgTable, unique, varchar } from "drizzle-orm/pg-core"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { organizationUserStatus } from "../components/values/organizationUserStatus.js"
import { organizationModel } from "./organization.js"
import { userModel } from "./user.js"

export const organizationUserModel = pgTable(
    "table_organization_user",
    {
        id: idColumn("id").primaryKey(),
        idOrganization: idColumn("id_organization")
            .references(() => organizationModel.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            })
            .notNull(),
        idUser: idColumn("id_user")
            .references(() => userModel.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            })
            .notNull(),
        isOwner: boolean("is_owner").notNull(),
        isAdmin: boolean("is_admin").notNull(),
        status: varchar("status", {
            length: 16,
            enum: organizationUserStatus,
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
        unique().on(t.idOrganization, t.idUser),
        index().on(t.idUser),
    ],
)

// Relations
export const organizationUserRelations = relations(organizationUserModel, ({ one }) => ({
    organization: one(organizationModel, {
        fields: [
            organizationUserModel.idOrganization,
        ],
        references: [
            organizationModel.id,
        ],
    }),
    user: one(userModel, {
        fields: [
            organizationUserModel.idUser,
        ],
        references: [
            userModel.id,
        ],
    }),
}))
