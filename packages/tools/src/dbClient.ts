import { modelSchemas } from "@arrhes/application-metadata/models"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "./env"

const connection = postgres(env()?.SQL_DATABASE_URL ?? "", { max: 1 })
export const dbClient = drizzle(connection, { schema: modelSchemas })
