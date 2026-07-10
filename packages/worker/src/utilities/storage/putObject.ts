import { PutObjectCommand, type S3 } from "@aws-sdk/client-s3"
import { ContextClients } from "#src/clients/contextClients.js"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export async function putObject(parameters: {
    s3Client?: S3
    bucketName?: string
    storageKey: string
    contentLength: number | undefined
    contentType: string | undefined
    metadata: Record<string, string>
    body: PutObjectCommand["input"]["Body"] | undefined
}) {
    try {
        const client = parameters.s3Client ?? ContextClients.storage
        const bucket = parameters.bucketName ?? ContextEnv.STORAGE_NAME

        const command = new PutObjectCommand({
            ACL: "private",
            Bucket: bucket,
            Key: parameters.storageKey,
            ContentLength: parameters.contentLength,
            ContentType: parameters.contentType,
            Metadata: parameters.metadata,
            Body: parameters.body,
        })

        const response = await client.send(command, {
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
