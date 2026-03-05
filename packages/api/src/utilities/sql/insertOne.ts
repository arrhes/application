import type { TableConfig } from "drizzle-orm"
import type { PgInsertValue, PgTable } from "drizzle-orm/pg-core"
import type { sqlClient } from "../../clients/sqlClient.js"
import { Exception } from "../../utilities/exception.js"

export async function insertOne<T extends PgTable<TableConfig>>(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    table: T
    data: PgInsertValue<T>
}): Promise<T["$inferSelect"]> {
    try {
        const responseMany = await parameters.database.insert(parameters.table).values(parameters.data).returning()

        const responseOne = responseMany.at(0)
        if (responseOne === undefined) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Object not inserted",
                cause: "Insert returned no rows",
            })
        }

        return responseOne
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Object not inserted",
            rawError: error,
        })
    }
}
