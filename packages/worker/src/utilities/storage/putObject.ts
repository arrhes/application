import { PutObjectCommand } from "@aws-sdk/client-s3"
import { ContextClients } from "#src/clients/contextClients.js"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export async function putObject(parameters: {
    storageKey: string
    contentLength: number | undefined
    contentType: string | undefined
    metadata: Record<string, string>
    body: PutObjectCommand["input"]["Body"] | undefined
}) {
    try {
        const command = new PutObjectCommand({
            ACL: "private",
            Bucket: ContextEnv.STORAGE_NAME,
            Key: parameters.storageKey,
            ContentLength: parameters.contentLength,
            ContentType: parameters.contentType,
            Metadata: parameters.metadata,
            Body: parameters.body,
        })

        const response = await ContextClients.storage.send(command, {
            abortSignal: undefined,
            requestTimeout: undefined,
        })

        return response
    } catch (error: unknown) {
        throw new Exception({
            internalMessage: "Object not uploaded to storage",
            rawError: error,
        })
    }
}
