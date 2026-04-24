import * as v from "valibot"
import { validate } from "./validate.js"

enum Env {
    development = "development",
    production = "production",
}

const envSchema = v.object({
    ENV: v.enum_(Env),
    VERBOSE: v.picklist(["true", "false"]),

    SQL_DATABASE_URL: v.string(),

    QDRANT_URL: v.string(),
    QDRANT_API_KEY: v.string(),

    AI_HF_API_KEY: v.string(),
    AI_OPENAI_API_KEY: v.string(),

    AI_GOOGLE_CREDENTIALS_BASE64: v.string(),
    AI_GOOGLE_ENDPOINT: v.optional(v.string(), ""),
    AI_GOOGLE_API_KEY: v.optional(v.string(), ""),

    STORAGE_ENDPOINT: v.string(),
    STORAGE_NAME: v.string(),
    STORAGE_ACCESS_KEY: v.string(),
    STORAGE_SECRET_KEY: v.string(),

    API_BASE_URL: v.string(),
    INTERNAL_API_KEY: v.optional(v.string(), ""),

    REDIS_HOST: v.string(),
    REDIS_PORT: v.string(),
    REDIS_USERNAME: v.string(),
    REDIS_PASSWORD: v.string(),

    LLM_PROVIDER: v.optional(v.picklist(["mistral-api", "ollama"]), "ollama"),
    LLM_BASE_URL: v.optional(v.string(), "http://localhost:11434"),
    LLM_MODEL: v.optional(v.string(), "mistral-small3.1"),
    LLM_API_KEY: v.optional(v.string(), ""),
})

// biome-ignore lint/complexity/noStaticOnlyClass: singleton-style mutable environment container used at process startup.
export class ContextEnv {
    static ENV: Env
    static VERBOSE: boolean

    static SQL_DATABASE_URL: string

    static QDRANT_URL: string
    static QDRANT_API_KEY: string

    static AI_HF_API_KEY: string
    static AI_OPENAI_API_KEY: string

    static AI_GOOGLE_CREDENTIALS_BASE64: string
    static AI_GOOGLE_ENDPOINT: string
    static AI_GOOGLE_API_KEY: string

    static STORAGE_ENDPOINT: string
    static STORAGE_NAME: string
    static STORAGE_ACCESS_KEY: string
    static STORAGE_SECRET_KEY: string

    static API_BASE_URL: string
    static INTERNAL_API_KEY: string

    static REDIS_HOST: string
    static REDIS_PORT: string
    static REDIS_USERNAME: string
    static REDIS_PASSWORD: string

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

        ContextEnv.QDRANT_URL = parsedEnv.QDRANT_URL
        ContextEnv.QDRANT_API_KEY = parsedEnv.QDRANT_API_KEY

        ContextEnv.AI_HF_API_KEY = parsedEnv.AI_HF_API_KEY
        ContextEnv.AI_OPENAI_API_KEY = parsedEnv.AI_OPENAI_API_KEY

        ContextEnv.AI_GOOGLE_CREDENTIALS_BASE64 = parsedEnv.AI_GOOGLE_CREDENTIALS_BASE64
        ContextEnv.AI_GOOGLE_ENDPOINT = parsedEnv.AI_GOOGLE_ENDPOINT
        ContextEnv.AI_GOOGLE_API_KEY = parsedEnv.AI_GOOGLE_API_KEY

        ContextEnv.STORAGE_ENDPOINT = parsedEnv.STORAGE_ENDPOINT
        ContextEnv.STORAGE_NAME = parsedEnv.STORAGE_NAME
        ContextEnv.STORAGE_ACCESS_KEY = parsedEnv.STORAGE_ACCESS_KEY
        ContextEnv.STORAGE_SECRET_KEY = parsedEnv.STORAGE_SECRET_KEY

        ContextEnv.API_BASE_URL = parsedEnv.API_BASE_URL
        ContextEnv.INTERNAL_API_KEY = parsedEnv.INTERNAL_API_KEY

        ContextEnv.REDIS_HOST = parsedEnv.REDIS_HOST
        ContextEnv.REDIS_PORT = parsedEnv.REDIS_PORT
        ContextEnv.REDIS_USERNAME = parsedEnv.REDIS_USERNAME
        ContextEnv.REDIS_PASSWORD = parsedEnv.REDIS_PASSWORD

        ContextEnv.LLM_PROVIDER = parsedEnv.LLM_PROVIDER
        ContextEnv.LLM_BASE_URL = parsedEnv.LLM_BASE_URL
        ContextEnv.LLM_MODEL = parsedEnv.LLM_MODEL
        ContextEnv.LLM_API_KEY = parsedEnv.LLM_API_KEY
    }
}
