import { DeleteObjectCommand, type S3 } from "@aws-sdk/client-s3"
import { ContextClients } from "#src/clients/contextClients.js"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export async function deleteObject(parameters: { s3Client?: S3; bucketName?: string; storageKey: string }) {
    try {
        const client = parameters.s3Client ?? ContextClients.storage
        const bucket = parameters.bucketName ?? ContextEnv.STORAGE_NAME

        const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key: parameters.storageKey,
        })

        const response = await client.send(command, {
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
