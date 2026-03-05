import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import { env } from "./env"

const sql = postgres(env()?.SQL_DATABASE_URL ?? "", { max: 1 })
const db = drizzle(sql)

await migrate(db, { migrationsFolder: "drizzle" })
