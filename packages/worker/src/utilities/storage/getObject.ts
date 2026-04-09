import { GetObjectCommand } from "@aws-sdk/client-s3"
import { ContextClients } from "#src/clients/contextClients.js"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export async function getObject(parameters: { storageKey: string | null | undefined }) {
    try {
        if (parameters.storageKey === null || parameters.storageKey === undefined) {
            throw new Exception({
                internalMessage: "Storage key is null or undefined",
            })
        }

        const command = new GetObjectCommand({
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
            internalMessage: "Object not retrieved from storage",
            rawError: error,
        })
    }
}
