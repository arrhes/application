import { PutObjectCommand, type S3 } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Exception } from "../exception.js"
import type { getClients } from "../getClients.js"
import type { getEnv } from "../getEnv.js"

export async function generatePutSignedUrl(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    s3Client?: S3
    bucketName?: string
    storageKey: string
    contentLength: number
    contentType: string
    metadata?: Record<string, string>
    expiresIn?: number
}) {
    try {
        const client = parameters.s3Client ?? parameters.var.clients.storage
        const bucket = parameters.bucketName ?? parameters.var.env.STORAGE_BUCKET_NAME

        const signedUrl = await getSignedUrl(
            client,
            new PutObjectCommand({
                Bucket: bucket,
                Key: parameters.storageKey,
                ContentLength: parameters.contentLength,
                ContentType: parameters.contentType,
                Metadata: parameters.metadata,
            }),
            {
                expiresIn: parameters.expiresIn ?? 60,
            },
        )

        return signedUrl
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "PUT signed URL not generated",
            rawError: error,
        })
    }
}
