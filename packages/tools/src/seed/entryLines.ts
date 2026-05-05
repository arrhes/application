import { and, eq } from "drizzle-orm"
import { dbClient } from "../dbClient.js"

async function entryLines() {
    try {
        await dbClient.transaction(async (tx) => {
            // entry lines
            const entryLines = await tx.query.entryLineModel.findMany({
                where: (table) => and(eq(table.idOrganization, "lt9m-dvre-y2s2-2fj6")),
                with: {
                    entry: true,
                },
            })

            console.log(entryLines)
        })
    } catch (error) {
        console.log(error)
    }
}

console.log("entryLines starting.")
await entryLines()

process.exit()
