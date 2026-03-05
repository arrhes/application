import type { SQL, TableConfig } from "drizzle-orm"
import type { PgTable } from "drizzle-orm/pg-core"
import type { sqlClient } from "../../clients/sqlClient.js"
import { Exception } from "../../utilities/exception.js"

export async function deleteMany<T extends PgTable<TableConfig>>(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    table: T
    where: ((table: T) => SQL<unknown> | undefined) | undefined
}) {
    try {
        const responseMany = await parameters.database
            .delete(parameters.table)
            .where(parameters.where === undefined ? undefined : parameters.where(parameters.table))
            .returning()

        return responseMany
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Objects not deleted",
            rawError: error,
        })
    }
}
