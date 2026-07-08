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

    SQL_DATABASE_URL: v.string(),

    STORAGE_ENDPOINT: v.string(),
    STORAGE_NAME: v.string(),
    STORAGE_ACCESS_KEY: v.string(),
    STORAGE_SECRET_KEY: v.string(),
    STORAGE_REGION: v.optional(v.string(), "fr-par"),

    API_BASE_URL: v.string(),
    INTERNAL_API_KEY: v.optional(v.string(), ""),

    REDIS_URL: v.string(),
    REDIS_URL_WRITE: v.optional(v.string()),

    LLM_PROVIDER: v.optional(
        v.picklist([
            "mistral-api",
            "ollama",
        ]),
        "ollama",
    ),
    LLM_BASE_URL: v.optional(v.string(), "http://localhost:11434"),
    LLM_MODEL: v.optional(v.string(), "mistral-small3.1"),
    LLM_API_KEY: v.optional(v.string(), ""),
})

// biome-ignore lint/complexity/noStaticOnlyClass: singleton-style mutable environment container used at process startup.
export class ContextEnv {
    static ENV: Env
    static VERBOSE: boolean

    static SQL_DATABASE_URL: string

    static STORAGE_ENDPOINT: string
    static STORAGE_NAME: string
    static STORAGE_ACCESS_KEY: string
    static STORAGE_SECRET_KEY: string
    static STORAGE_REGION: string

    static API_BASE_URL: string
    static INTERNAL_API_KEY: string

    static REDIS_URL: string
    static REDIS_URL_WRITE: string | undefined

    static LLM_PROVIDER: string
    static LLM_BASE_URL: string
    static LLM_MODEL: string
    static LLM_API_KEY: string

    static async init() {
        const parsedEnv = validate({
            schema: envSchema,
            // @ts-expect-error
            data: process.env,
            message: "Missing environment variables",
        })

        ContextEnv.ENV = parsedEnv.ENV
        ContextEnv.VERBOSE = parsedEnv.VERBOSE === "true"

        ContextEnv.SQL_DATABASE_URL = parsedEnv.SQL_DATABASE_URL

        ContextEnv.STORAGE_ENDPOINT = parsedEnv.STORAGE_ENDPOINT
        ContextEnv.STORAGE_NAME = parsedEnv.STORAGE_NAME
        ContextEnv.STORAGE_ACCESS_KEY = parsedEnv.STORAGE_ACCESS_KEY
        ContextEnv.STORAGE_SECRET_KEY = parsedEnv.STORAGE_SECRET_KEY
        ContextEnv.STORAGE_REGION = parsedEnv.STORAGE_REGION

        ContextEnv.API_BASE_URL = parsedEnv.API_BASE_URL
        ContextEnv.INTERNAL_API_KEY = parsedEnv.INTERNAL_API_KEY

        ContextEnv.REDIS_URL = parsedEnv.REDIS_URL
        ContextEnv.REDIS_URL_WRITE = parsedEnv.REDIS_URL_WRITE

        ContextEnv.LLM_PROVIDER = parsedEnv.LLM_PROVIDER
        ContextEnv.LLM_BASE_URL = parsedEnv.LLM_BASE_URL
        ContextEnv.LLM_MODEL = parsedEnv.LLM_MODEL
        ContextEnv.LLM_API_KEY = parsedEnv.LLM_API_KEY
    }
}
