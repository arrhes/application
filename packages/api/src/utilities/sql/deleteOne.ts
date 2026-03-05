import type { SQL, TableConfig } from "drizzle-orm"
import type { PgTable } from "drizzle-orm/pg-core"
import type { sqlClient } from "../../clients/sqlClient.js"
import { Exception } from "../../utilities/exception.js"

export async function deleteOne<T extends PgTable<TableConfig>>(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    table: T
    where: ((table: T) => SQL<unknown> | undefined) | undefined
}): Promise<T["$inferSelect"]> {
    try {
        const responseMany = await parameters.database
            .delete(parameters.table)
            .where(parameters.where === undefined ? undefined : parameters.where(parameters.table))
            .returning()

        const responseOne = responseMany.at(0)
        if (responseOne === undefined) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Object not deleted",
                cause: "Object not found",
            })
        }

        return responseOne
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Object not deleted",
            rawError: error,
        })
    }
}
