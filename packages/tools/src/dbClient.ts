import { modelSchemas } from "@arrhes/application-metadata/models"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "./env"

export const dbConnection = postgres(env()?.SQL_DATABASE_URL ?? "", { max: 1 })
export const dbClient = drizzle(dbConnection, { schema: modelSchemas })
