import type { SQL, TableConfig } from "drizzle-orm"
import type { PgTable, PgUpdateSetSource } from "drizzle-orm/pg-core"
import type { sqlClient } from "../../clients/sqlClient.js"
import { Exception } from "../../utilities/exception.js"

export async function updateOne<T extends PgTable<TableConfig>>(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    table: T
    data: PgUpdateSetSource<T>
    where: ((table: T) => SQL<unknown> | undefined) | undefined
}) {
    try {
        const responseMany = await parameters.database
            .update(parameters.table)
            .set(parameters.data)
            .where(parameters.where === undefined ? undefined : parameters.where(parameters.table))
            .returning()

        const responseOne = responseMany.at(0)
        if (responseOne === undefined) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Object not updated",
                cause: "Object not found",
            })
        }

        return responseOne
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Object not updated",
            rawError: error,
        })
    }
}
