import type { PgInsertValue, PgTable, TableConfig } from "drizzle-orm/pg-core"
import type { dbClient } from "../dbClient.js"

// : Promise<Array<T["$inferInsert"]>>

export async function insertMany<T extends PgTable<TableConfig>>(parameters: {
    database: typeof dbClient | Parameters<Parameters<(typeof dbClient)["transaction"]>[0]>[0]
    table: T
    data: Array<PgInsertValue<T>>
}) {
    const responseMany = await parameters.database.insert(parameters.table).values(parameters.data).returning()

    return responseMany
}
