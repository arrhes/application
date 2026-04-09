import { PredictionServiceClient } from "@google-cloud/aiplatform"
import { InferenceClient } from "@huggingface/inference"
import OpenAI from "openai"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export function aiClient() {
    try {
        const openAIClient = new OpenAI({
            baseURL: undefined,
            apiKey: ContextEnv.AI_OPENAI_API_KEY,
        })

        const HFClient: InferenceClient = new InferenceClient(ContextEnv.AI_HF_API_KEY)

        const googleClient = new PredictionServiceClient({
            apiEndpoint: ContextEnv.AI_GOOGLE_ENDPOINT,
            apiKey: ContextEnv.AI_GOOGLE_API_KEY,
        })

        return {
            openAI: openAIClient,
            huggingface: HFClient,
            google: googleClient,
        }
    } catch (error) {
        throw new Exception({
            internalMessage: "AI clients not available",
            rawError: error,
        })
    }
}
