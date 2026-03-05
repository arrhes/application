import { modelSchemas } from "@arrhes/application-metadata"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { Exception } from "../utilities/exception.js"
import type { getEnv } from "../utilities/getEnv.js"

export function sqlClient(env: ReturnType<typeof getEnv>) {
    try {
        const queryClient = postgres(env.SQL_DATABASE_URL)
        const db = drizzle(queryClient, { schema: modelSchemas })
        return db
    } catch (error) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "SQL client not available",
            rawError: error,
        })
    }
}
