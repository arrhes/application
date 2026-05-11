import { modelSchemas } from "@arrhes/application-metadata"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export function sqlClient() {
    try {
        const queryClient = postgres(ContextEnv.SQL_DATABASE_URL)
        const db = drizzle(queryClient, {
            schema: modelSchemas,
        })
        return db
    } catch (error) {
        throw new Exception({
            internalMessage: "SQL client not available",
            rawError: error,
        })
    }
}
