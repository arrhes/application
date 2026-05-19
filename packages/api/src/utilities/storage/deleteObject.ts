import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { Exception } from "../exception.js"
import type { getClients } from "../getClients.js"
import type { getEnv } from "../getEnv.js"

export async function deleteObject(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    storageKey: string
}) {
    try {
        const response = await parameters.var.clients.storage.send(
            new DeleteObjectCommand({
                Bucket: parameters.var.env.STORAGE_BUCKET_NAME,
                Key: parameters.storageKey,
            }),
            {
                abortSignal: undefined,
                requestTimeout: undefined,
            },
        )

        return response
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Object not deleted from storage",
            rawError: error,
        })
    }
}
