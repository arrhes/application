import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { ContextClients } from "#src/clients/contextClients.js"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export async function deleteObject(parameters: { storageKey: string }) {
    try {
        const command = new DeleteObjectCommand({
            Bucket: ContextEnv.STORAGE_NAME,
            Key: parameters.storageKey,
        })

        const response = await ContextClients.storage.send(command, {
            abortSignal: undefined,
            requestTimeout: undefined,
        })

        return response
    } catch (error: unknown) {
        throw new Exception({
            internalMessage: "Object not deleted from storage",
            rawError: error,
        })
    }
}
