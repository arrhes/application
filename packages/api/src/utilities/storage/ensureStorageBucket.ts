import type { S3 } from "@aws-sdk/client-s3"
import { CreateBucketCommand, HeadBucketCommand, type HeadBucketCommandOutput } from "@aws-sdk/client-s3"

/**
 * Ensures the storage bucket exists, creating it if necessary.
 * Should be called once at server startup.
 */
export async function ensureStorageBucket(client: S3, bucketName: string) {
    let headResult: HeadBucketCommandOutput | undefined
    try {
        headResult = await client.send(new HeadBucketCommand({ Bucket: bucketName }))
    } catch (error: unknown) {
        const name = error instanceof Object && "name" in error ? (error as { name: string }).name : undefined
        const httpStatusCode =
            error instanceof Object &&
            "$metadata" in error &&
            error.$metadata instanceof Object &&
            "httpStatusCode" in error.$metadata
                ? (error.$metadata as { httpStatusCode: number }).httpStatusCode
                : undefined

        if (name === "NotFound" || name === "NoSuchBucket" || httpStatusCode === 404) {
            console.info(`Bucket "${bucketName}" not found, creating it...`)
            await client.send(new CreateBucketCommand({ Bucket: bucketName }))
            console.info(`Bucket "${bucketName}" created.`)
            return
        }

        // Some S3-compatible providers (OpenStack Swift, etc.) return 400
        // or other non-standard codes for HeadBucket. Log and continue
        // rather than crashing the server — actual storage operations
        // will surface real errors at request time.
        console.warn(
            `HeadBucket check failed (HTTP ${httpStatusCode ?? "unknown"}, name: ${name ?? "unknown"}). ` +
                `Assuming bucket "${bucketName}" exists. Storage errors will surface at request time if misconfigured.`,
        )
        return
    }

    if (headResult) {
        console.info(`Bucket "${bucketName}" is accessible.`)
    }
}
