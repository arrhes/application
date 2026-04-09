import { QdrantClient } from "@qdrant/qdrant-js"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export function qdrantClient() {
    try {
        const qdrant = new QdrantClient({
            url: ContextEnv.QDRANT_URL,
            apiKey: ContextEnv.QDRANT_API_KEY,
            https: false,
            checkCompatibility: true,
        })
        return qdrant
    } catch (error) {
        throw new Exception({
            internalMessage: "Qdrant client not available",
            rawError: error,
        })
    }
}
