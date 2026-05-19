import { GetObjectCommand } from "@aws-sdk/client-s3"
import { Exception } from "../exception.js"
import type { getClients } from "../getClients.js"
import type { getEnv } from "../getEnv.js"

export async function getObject(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    storageKey: string | null | undefined
}) {
    try {
        const command = new GetObjectCommand({
            Bucket: parameters.var.env.STORAGE_BUCKET_NAME,
            Key: parameters.storageKey ?? undefined,
        })

        const response = await parameters.var.clients.storage.send(command, {
            abortSignal: undefined,
            requestTimeout: undefined,
        })

        return response
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Object not retrieved from storage",
            rawError: error,
        })
    }
}
