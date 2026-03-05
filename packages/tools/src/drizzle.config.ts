import type { Config } from "drizzle-kit"
import { env } from "./env"

export default {
    schema: "./src/schemas.ts",
    out: "./drizzle",
    dialect: "postgresql",
    strict: true,
    dbCredentials: {
        url: env()?.SQL_DATABASE_URL ?? "",
    },
    verbose: true,
} satisfies Config
