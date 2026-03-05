import type { SQL, TableConfig } from "drizzle-orm"
import type { PgTable } from "drizzle-orm/pg-core"
import type { sqlClient } from "../../clients/sqlClient.js"
import { Exception } from "../../utilities/exception.js"

export async function selectMany<T extends PgTable<TableConfig>>(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    table: T
    where?: (table: T) => SQL<unknown> | undefined
    limit?: number
    offset?: number
    orderBy?: (table: T) => SQL<unknown>
}) {
    try {
        const query = parameters.database
            .select()
            // @ts-expect-error: Unreachable code error
            .from(parameters.table)
            .where(parameters?.where === undefined ? undefined : parameters.where(parameters.table))

        if (parameters.limit !== undefined) {
            query.limit(parameters.limit)
        }

        if (parameters.offset !== undefined) {
            query.offset(parameters.offset)
        }

        if (parameters.orderBy !== undefined) {
            query.orderBy(parameters.orderBy(parameters.table))
        }

        const responseMany = await query

        return responseMany
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Objects not selected",
            rawError: error,
        })
    }
}
