import { relations } from "drizzle-orm"
import { type AnyPgColumn, bigint, boolean, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { organizationScope } from "../components/index.js"
import { dateTimeColumn } from "../components/models/dateTimeColumn.js"
import { idColumn } from "../components/models/idColumn.js"
import { organizationUserModel } from "./organizationUser.js"
import { userModel } from "./user.js"

export const organizationModel = pgTable("table_organization", {
    id: idColumn("id").primaryKey(),
    isArchived: boolean("is_archived").notNull(),
    scope: varchar("scope", {
        length: 32,
        enum: organizationScope,
    }).notNull(),
    name: varchar("name", {
        length: 256,
    }).notNull(),
    storageLimit: bigint("storage_limit", {
        mode: "number",
    })
        .notNull()
        .default(1_073_741_824),
    storageCurrentUsage: bigint("storage_current_usage", {
        mode: "number",
    })
        .notNull()
        .default(0),
    storageEndpoint: text("storage_endpoint"),
    storageAccessKey: text("storage_access_key"),
    storageSecretKey: text("storage_secret_key"),
    storageBucketName: text("storage_bucket_name"),
    storageRegion: varchar("storage_region", {
        length: 64,
    }),
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
})

// Relations
export const organizationRelations = relations(organizationModel, ({ many }) => ({
    organizationUsers: many(organizationUserModel),
}))
