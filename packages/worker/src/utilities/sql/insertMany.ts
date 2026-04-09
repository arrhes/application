import type { PgInsertValue, PgTable, TableConfig } from "drizzle-orm/pg-core"
import type { sqlClient } from "#src/clients/sqlClient.js"
import { Exception } from "#src/utilities/exception.js"

export async function insertMany<T extends PgTable<TableConfig>>(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    table: T
    data: Array<PgInsertValue<T>>
}): Promise<Array<T["$inferInsert"]>> {
    try {
        const responseMany = await parameters.database.insert(parameters.table).values(parameters.data).returning()

        return responseMany
    } catch (error: unknown) {
        throw new Exception({
            internalMessage: "Objects not inserted",
            rawError: error,
        })
    }
}
