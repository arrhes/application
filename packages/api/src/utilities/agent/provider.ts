import { createOllamaChat } from "@tanstack/ai-ollama"
import type { getEnv } from "../getEnv.js"
import { createMistralChat } from "./mistralAdapter.js"

type Env = ReturnType<typeof getEnv>

export function getAdapter(env: Env) {
    if (env.LLM_PROVIDER === "mistral-api") {
        return createMistralChat(env.LLM_MODEL, {
            apiKey: env.LLM_API_KEY,
            baseURL: env.LLM_BASE_URL,
        })
    }

    // Default: Ollama
    return createOllamaChat(env.LLM_MODEL, env.LLM_BASE_URL)
}
