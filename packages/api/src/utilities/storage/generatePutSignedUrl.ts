import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Exception } from "../../utilities/exception.js"
import type { getClients } from "../../utilities/getClients.js"
import type { getEnv } from "../../utilities/getEnv.js"

export async function generatePutSignedUrl(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    storageKey: string
    contentLength: number
    contentType: string
    metadata?: Record<string, string>
    expiresIn?: number
}) {
    try {
        const signedUrl = await getSignedUrl(
            parameters.var.clients.storagePublic,
            new PutObjectCommand({
                ACL: "private",
                Bucket: parameters.var.env.STORAGE_BUCKET_NAME,
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
