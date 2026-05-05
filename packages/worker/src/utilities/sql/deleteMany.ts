import type { SQL, TableConfig } from "drizzle-orm"
import type { PgTable } from "drizzle-orm/pg-core"
import type { sqlClient } from "#src/clients/sqlClient.js"
import { Exception } from "#src/utilities/exception.js"

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
            internalMessage: "Error deleting many",
            rawError: error,
        })
    }
}
