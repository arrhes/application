import { createOllamaChat } from "@tanstack/ai-ollama"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { createMistralChat } from "./mistralAdapter.js"

export function getAdapter(credentials?: {
    llmProvider?: string | null
    llmApiKey?: string | null
    llmBaseUrl?: string | null
    llmModel?: string | null
}) {
    const provider = credentials?.llmProvider ?? ContextEnv.LLM_PROVIDER
    const apiKey = credentials?.llmApiKey ?? ContextEnv.LLM_API_KEY
    const baseURL = credentials?.llmBaseUrl ?? ContextEnv.LLM_BASE_URL
    const model = credentials?.llmModel ?? ContextEnv.LLM_MODEL

    if (provider === "mistral-api") {
        return createMistralChat(model, {
            apiKey,
            baseURL,
        })
    }
    return createOllamaChat(model, baseURL)
}
