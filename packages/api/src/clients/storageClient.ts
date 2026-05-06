import { S3 } from "@aws-sdk/client-s3"
import { Exception } from "../utilities/exception.js"
import type { getEnv } from "../utilities/getEnv.js"

export function storageClient(env: ReturnType<typeof getEnv>) {
    try {
        const client = new S3({
            endpoint: env.STORAGE_ENDPOINT,
            credentials: {
                accessKeyId: env.STORAGE_ACCESS_KEY,
                secretAccessKey: env.STORAGE_SECRET_KEY,
            },
            region: env.STORAGE_REGION,
            forcePathStyle: true,
        })
        return client
    } catch (error) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Storage client not available",
            rawError: error,
        })
    }
}


