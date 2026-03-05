import { and, eq } from "drizzle-orm"
import { dbClient } from "../dbClient.js"

async function recordRows() {
    try {
        await dbClient.transaction(async (tx) => {
            // recordrows
            const recordRows = await tx.query.recordRowModel.findMany({
                where: (table) => and(eq(table.idOrganization, "lt9m-dvre-y2s2-2fj6")),
                with: {
                    record: true,
                },
            })

            console.log(recordRows)
        })
    } catch (error) {
        console.log(error)
    }
}

console.log("recordRows starting.")
await recordRows()

process.exit()
