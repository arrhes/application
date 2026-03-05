import { sql } from "drizzle-orm"
import { dbClient } from "./dbClient.js"

async function clearDb() {
    const query = sql<string>`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `
    // CREATE EXTENSION IF NOT EXISTS pg_trgm;

    const tables = await dbClient.execute(query)

    for (const table of tables) {
        const query = sql.raw(`DROP TABLE ${table.table_name} CASCADE;`)
        await dbClient.execute(query)
    }

    return
}

console.log("Clearing starting.")
await clearDb()
console.log("Clearing is done.")

process.exit()
