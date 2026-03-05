import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { Exception } from "../../utilities/exception.js"
import type { getClients } from "../../utilities/getClients.js"
import type { getEnv } from "../../utilities/getEnv.js"

export async function deleteObject(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    storageKey: string
}) {
    try {
        const command = new DeleteObjectCommand({
            Bucket: parameters.var.env.STORAGE_BUCKET_NAME,
            Key: parameters.storageKey,
        })

        const response = await parameters.var.clients.storage.send(command, {
            abortSignal: undefined,
            requestTimeout: undefined,
        })

        return response
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Object not deleted from storage",
            rawError: error,
        })
    }
}
