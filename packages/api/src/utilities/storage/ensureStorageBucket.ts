import type { S3 } from "@aws-sdk/client-s3"
import { CreateBucketCommand, HeadBucketCommand } from "@aws-sdk/client-s3"

/**
 * Ensures the storage bucket exists, creating it if necessary.
 * Should be called once at server startup.
 */
export async function ensureStorageBucket(client: S3, bucketName: string) {
    try {
        await client.send(new HeadBucketCommand({ Bucket: bucketName }))
    } catch (error: unknown) {
        const name = error instanceof Object && "name" in error ? (error as { name: string }).name : undefined
        const httpStatusCode =
            error instanceof Object &&
            "$metadata" in error &&
            error.$metadata instanceof Object &&
            "httpStatusCode" in error.$metadata
                ? (error.$metadata as { httpStatusCode: number }).httpStatusCode
                : undefined

        if (name === "NotFound" || name === "NoSuchBucket" || httpStatusCode === 404 || httpStatusCode === 403) {
            console.info(`Bucket "${bucketName}" not found, creating it...`)
            await client.send(new CreateBucketCommand({ Bucket: bucketName }))
            console.info(`Bucket "${bucketName}" created.`)
        } else {
            throw error
        }
    }
}
