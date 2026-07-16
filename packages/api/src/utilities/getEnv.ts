import * as v from "valibot"
import { validate } from "./validate.js"

enum Env {
    development = "development",
    production = "production",
}

const envSchema = v.object({
    ENV: v.enum_(Env),
    VERBOSE: v.picklist([
        "true",
        "false",
    ]),
    PORT: v.string(),

    CORS_ORIGIN: v.string(),
    COOKIES_DOMAIN: v.string(),
    COOKIES_KEY: v.string(),

    API_BASE_URL: v.string(),
    WEBSITE_BASE_URL: v.string(),
    DASHBOARD_BASE_URL: v.string(),

    SQL_DATABASE_URL: v.string(),

    STORAGE_ENDPOINT: v.string(),
    STORAGE_BUCKET_NAME: v.string(),
    STORAGE_ACCESS_KEY: v.string(),
    STORAGE_SECRET_KEY: v.string(),
    STORAGE_REGION: v.optional(v.string(), "fr-par"),

    MOLLIE_API_KEY: v.string(),
})

export function getEnv() {
    const parsedEnv = validate({
        schema: envSchema,
        data: process.env,
    })

    return parsedEnv
}
