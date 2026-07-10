import { GetObjectCommand, type S3 } from "@aws-sdk/client-s3"
import { Exception } from "../exception.js"
import type { getClients } from "../getClients.js"
import type { getEnv } from "../getEnv.js"

export async function getObject(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    s3Client?: S3
    bucketName?: string
    storageKey: string | null | undefined
}) {
    try {
        const client = parameters.s3Client ?? parameters.var.clients.storage
        const bucket = parameters.bucketName ?? parameters.var.env.STORAGE_BUCKET_NAME

        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: parameters.storageKey ?? undefined,
        })

        const response = await client.send(command, {
            abortSignal: undefined,
            requestTimeout: undefined,
        })

        return response
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Object not retrieved from storage",
            rawError: error,
        })
    }
}
