import type { PgInsertValue, PgTable, TableConfig } from "drizzle-orm/pg-core"
import type { sqlClient } from "../../clients/sqlClient.js"
import { Exception } from "../../utilities/exception.js"

// : Promise<Array<T["$inferInsert"]>>

export async function insertMany<T extends PgTable<TableConfig>>(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    table: T
    data: Array<PgInsertValue<T>>
}) {
    try {
        const responseMany = await parameters.database.insert(parameters.table).values(parameters.data).returning()

        return responseMany
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Objects not inserted",
            rawError: error,
        })
    }
}
