import { createOllamaChat } from "@tanstack/ai-ollama"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { createMistralChat } from "./mistralAdapter.js"

export function getAdapter() {
    if (ContextEnv.LLM_PROVIDER === "mistral-api") {
        return createMistralChat(ContextEnv.LLM_MODEL, {
            apiKey: ContextEnv.LLM_API_KEY,
            baseURL: ContextEnv.LLM_BASE_URL,
        })
    }
    return createOllamaChat(ContextEnv.LLM_MODEL, ContextEnv.LLM_BASE_URL)
}
