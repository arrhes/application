import { DeleteObjectCommand, type S3 } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Exception } from "../exception.js"
import type { getClients } from "../getClients.js"
import type { getEnv } from "../getEnv.js"

export async function generateDeleteSignedUrl(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    s3Client?: S3
    bucketName?: string
    storageKey: string
    expiresIn?: number
}) {
    try {
        const client = parameters.s3Client ?? parameters.var.clients.storage
        const bucket = parameters.bucketName ?? parameters.var.env.STORAGE_BUCKET_NAME

        const signedUrl = await getSignedUrl(
            client,
            new DeleteObjectCommand({
                Bucket: bucket,
                Key: parameters.storageKey,
            }),
            {
                expiresIn: parameters.expiresIn ?? 60,
            },
        )
        return signedUrl
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "DELETE signed URL not generated",
            rawError: error,
        })
    }
}
