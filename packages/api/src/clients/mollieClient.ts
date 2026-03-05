import { createMollieClient } from "@mollie/api-client"
import { Exception } from "../utilities/exception.js"
import type { getEnv } from "../utilities/getEnv.js"

export function mollieClient(env: ReturnType<typeof getEnv>) {
    try {
        const mollie = createMollieClient({
            apiKey: env.MOLLIE_API_KEY,
        })
        return mollie
    } catch (error) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Mollie client not available",
            rawError: error,
        })
    }
}
