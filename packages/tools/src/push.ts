// Programmatic drizzle-kit push
// =============================================================================
// Drizzle-kit CLI uses CJS module resolution internally (esbuild-register),
// which cannot resolve .js extension imports to .ts files. The metadata package
// uses ESM-style .js extensions in imports (standard TypeScript convention).
//
// This script bypasses drizzle-kit's CLI and uses its programmatic API instead.
// It runs with tsx, which properly handles .js → .ts extension resolution.
// =============================================================================

import { modelSchemas } from "@arrhes/application-metadata/models"
import { pushSchema } from "drizzle-kit/api"
import { sql } from "drizzle-orm"
import type { PgDatabase } from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "./env"

const connection = postgres(env()?.SQL_DATABASE_URL ?? "", { max: 1 })
const db = drizzle(connection)

// Check if tables already exist (idempotency guard)
// If any application table exists, skip the push — the schema is already in place.
const existingTables = await db.execute(
    sql.raw(
        `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'table_%'`,
    ),
)
const tableCount = Array.from(existingTables as any).length

if (tableCount > 0) {
    console.log(`Schema already exists (${tableCount} tables found). Skipping push.`)
    await connection.end()
    process.exit(0)
}

// Drizzle-kit's pushSchema internally does:
//   const res = await drizzleInstance.execute(sql.raw(query))
//   return res.rows
//
// With postgres-js, execute() returns a RowList (array-like) directly,
// not { rows: [...] }. We wrap the db instance to fix this.
const wrappedDb = new Proxy(db, {
    get(target, prop, receiver) {
        if (prop === "execute") {
            return async (...args: Parameters<typeof db.execute>) => {
                const result = await target.execute(...args)
                if (result && "rows" in result) {
                    return result
                }
                return { rows: Array.from(result as any) }
            }
        }
        return Reflect.get(target, prop, receiver)
    },
}) as unknown as PgDatabase<any>

const { apply, hasDataLoss, warnings, statementsToExecute } = await pushSchema(modelSchemas, wrappedDb)

if (statementsToExecute.length === 0) {
    console.log("No schema changes detected.")
} else {
    console.log(`Executing ${statementsToExecute.length} statement(s)...`)
    if (hasDataLoss) {
        console.log("WARNING: Data loss detected in the following:")
        for (const warning of warnings) {
            console.log(`  ${warning}`)
        }
    }
    await apply()
    console.log("Schema push complete.")
}

await connection.end()
process.exit(0)
