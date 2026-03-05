import { S3 } from "@aws-sdk/client-s3"
import { Exception } from "../utilities/exception.js"
import type { getEnv } from "../utilities/getEnv.js"

export function storageClient(env: ReturnType<typeof getEnv>) {
    try {
        const storageClient = new S3({
            endpoint: env.STORAGE_ENDPOINT,
            credentials: {
                accessKeyId: env.STORAGE_ACCESS_KEY,
                secretAccessKey: env.STORAGE_SECRET_KEY,
            },
            region: "fr-par",
            forcePathStyle: true,
        })
        return storageClient
    } catch (error) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Storage client not available",
            rawError: error,
        })
    }
}

/**
 * S3 client configured with the public endpoint.
 * Used exclusively for generating pre-signed URLs that are
 * accessed by the browser (GET/PUT signed URLs).
 */
export function storagePublicClient(env: ReturnType<typeof getEnv>) {
    try {
        const client = new S3({
            endpoint: env.STORAGE_PUBLIC_ENDPOINT,
            credentials: {
                accessKeyId: env.STORAGE_ACCESS_KEY,
                secretAccessKey: env.STORAGE_SECRET_KEY,
            },
            region: "fr-par",
            forcePathStyle: true,
        })
        return client
    } catch (error) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Storage public client not available",
            rawError: error,
        })
    }
}
