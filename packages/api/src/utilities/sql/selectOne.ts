import type { SQL, TableConfig } from "drizzle-orm"
import type { PgTable } from "drizzle-orm/pg-core"
import type { sqlClient } from "../../clients/sqlClient.js"
import { Exception } from "../../utilities/exception.js"

export async function selectOne<T extends PgTable<TableConfig>>(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    table: T
    where: ((table: T) => SQL<unknown> | undefined) | undefined
}) {
    try {
        const responseMany = await parameters.database
            .select()
            // @ts-expect-error: Unreachable code error
            .from(parameters.table)
            .where(parameters.where === undefined ? undefined : parameters.where(parameters.table))
            .limit(1)

        const responseOne = responseMany.at(0)
        if (responseOne === undefined) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Object not selected",
                cause: "Object not found",
            })
        }

        return responseOne
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Object not selected",
            rawError: error,
        })
    }
}
