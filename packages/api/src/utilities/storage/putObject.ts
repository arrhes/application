import { PutObjectCommand } from "@aws-sdk/client-s3"
import { Exception } from "../exception.js"
import type { getClients } from "../getClients.js"
import type { getEnv } from "../getEnv.js"

export async function putObject(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    storageKey: string
    contentLength: number | undefined
    contentType: string | undefined
    metadata: Record<string, string>
    body: PutObjectCommand["input"]["Body"] | undefined
}) {
    try {
        const command = new PutObjectCommand({
            Bucket: parameters.var.env.STORAGE_BUCKET_NAME,
            Key: parameters.storageKey,
            ContentLength: parameters.contentLength,
            ContentType: parameters.contentType,
            Metadata: parameters.metadata,
            Body: parameters.body,
        })

        const response = await parameters.var.clients.storage.send(command, {
            abortSignal: undefined,
            requestTimeout: undefined,
        })

        return response
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Object not uploaded to storage",
            rawError: error,
        })
    }
}
