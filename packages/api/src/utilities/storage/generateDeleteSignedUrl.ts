import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Exception } from "../../utilities/exception.js"
import type { getClients } from "../../utilities/getClients.js"
import type { getEnv } from "../../utilities/getEnv.js"

export async function generateDeleteSignedUrl(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    storageKey: string
    expiresIn?: number
}) {
    try {
        const signedUrl = await getSignedUrl(
            parameters.var.clients.storage,
            new DeleteObjectCommand({
                Bucket: parameters.var.env.STORAGE_BUCKET_NAME,
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
