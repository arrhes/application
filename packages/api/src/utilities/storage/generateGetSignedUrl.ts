import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Exception } from "../exception.js"
import type { getClients } from "../getClients.js"
import type { getEnv } from "../getEnv.js"
import { storageFileExpiresIn } from "../variables.js"

export async function generateGetSignedUrl(parameters: {
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
            new GetObjectCommand({
                Bucket: parameters.var.env.STORAGE_BUCKET_NAME,
                Key: parameters.storageKey,
            }),
            {
                expiresIn: parameters.expiresIn ?? storageFileExpiresIn,
                signableHeaders: new Set<string>(),
                signingDate: new Date(),
            },
        )

        return signedUrl
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "GET signed URL not generated",
            rawError: error,
        })
    }
}
