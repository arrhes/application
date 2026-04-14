import { S3 } from "@aws-sdk/client-s3"
import { ContextEnv } from "#src/utilities/contextEnv.js"
import { Exception } from "#src/utilities/exception.js"

export function storageClient() {
    try {
        const storageClient = new S3({
            endpoint: ContextEnv.STORAGE_ENDPOINT,
            credentials: {
                accessKeyId: ContextEnv.STORAGE_ACCESS_KEY,
                secretAccessKey: ContextEnv.STORAGE_SECRET_KEY,
            },
            region: "fr-par",
            forcePathStyle: true,
        })
        return storageClient
    } catch (error) {
        throw new Exception({
            internalMessage: "Storage client not available",
            rawError: error,
        })
    }
}
