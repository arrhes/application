import { sql } from "drizzle-orm"
import { dbClient } from "../dbClient.js"

async function migration() {
    try {
        await dbClient.transaction(async (tx) => {
            // Add storage_limit column to table_organization (default 1 Go = 1,073,741,824 bytes)
            await tx.execute(
                sql`ALTER TABLE table_organization ADD COLUMN IF NOT EXISTS storage_limit integer NOT NULL DEFAULT 1073741824`,
            )
            console.log("Migration complete: added storage_limit column to table_organization.")
        })
    } catch (error) {
        console.log(error)
    }
}

await migration()
process.exit()
