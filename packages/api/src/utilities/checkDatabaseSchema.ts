import { models } from "@arrhes/application-metadata"
import { getTableColumns, getTableName, sql } from "drizzle-orm"
import type { sqlClient } from "../clients/sqlClient.js"

type DbClient = ReturnType<typeof sqlClient>

export async function checkDatabaseSchema(db: DbClient) {
    // Collect expected tables and their columns from the Drizzle model definitions.
    // `models` is a plain { key: pgTable } object - table instances only, no relations.
    const expected = new Map<string, Set<string>>() // table_name -> Set<db_column_name>

    for (const table of Object.values(models)) {
        const tableName = getTableName(table)
        const columns = getTableColumns(table)
        const colNames = new Set(Object.values(columns).map((col) => col.name))
        expected.set(tableName, colNames)
    }

    // Query all columns present in the public schema
    const rows = await db.execute<{
        table_name: string
        column_name: string
    }>(
        sql`SELECT table_name, column_name
            FROM information_schema.columns
            WHERE table_schema = 'public'`,
    )

    const actual = new Map<string, Set<string>>()
    for (const row of rows) {
        if (!actual.has(row.table_name)) {
            actual.set(row.table_name, new Set())
        }
        actual.get(row.table_name)!.add(row.column_name)
    }

    const drift: string[] = []

    // Model → DB: tables/columns expected by the code but absent from the DB
    for (const [tableName, expectedCols] of expected) {
        if (!actual.has(tableName)) {
            drift.push(`  Table '${tableName}' is missing from the database`)
            continue
        }
        const actualCols = actual.get(tableName)!
        for (const col of expectedCols) {
            if (!actualCols.has(col)) {
                drift.push(`  Column '${tableName}.${col}' is missing from the database`)
            }
        }
    }

    // DB → Model: tables/columns present in the DB but no longer in the code
    for (const [tableName, actualCols] of actual) {
        if (!expected.has(tableName)) {
            drift.push(`  Table '${tableName}' exists in the database but has no model`)
            continue
        }
        const expectedCols = expected.get(tableName)!
        for (const col of actualCols) {
            if (!expectedCols.has(col)) {
                drift.push(`  Column '${tableName}.${col}' exists in the database but is not in the model`)
            }
        }
    }

    if (drift.length > 0) {
        const message = `Database schema is out of date - run migrations before starting the API:\n${drift.join("\n")}`
        console.error(message)
        throw new Error(message)
    }

    console.info(`Database schema check passed (${expected.size} tables verified)`)
}
