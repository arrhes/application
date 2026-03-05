import { varchar } from "drizzle-orm/pg-core"

export function idColumn(id: string) {
    return varchar(id, {
        length: 256,
    })
}
