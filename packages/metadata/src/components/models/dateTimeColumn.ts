import { timestamp } from "drizzle-orm/pg-core"

export function dateTimeColumn(id: string) {
    return timestamp(id, {
        mode: "string",
        withTimezone: true,
        precision: 0,
    })
}
