import { ContextEnv } from "#src/utilities/contextEnv.js"
import { createMistralChat } from "./mistralAdapter.js"

export function getAdapter(credentials?: {
    llmApiKey?: string | null
    llmBaseUrl?: string | null
    llmModel?: string | null
}) {
    const apiKey = credentials?.llmApiKey ?? ContextEnv.LLM_API_KEY
    const baseURL = credentials?.llmBaseUrl ?? ContextEnv.LLM_BASE_URL
    const model = credentials?.llmModel ?? ContextEnv.LLM_MODEL

    return createMistralChat(model, {
        apiKey,
        baseURL,
    })
}
