import type { S3 } from "@aws-sdk/client-s3"
import { CreateBucketCommand, HeadBucketCommand, type HeadBucketCommandOutput } from "@aws-sdk/client-s3"

/**
 * Ensures the storage bucket exists, creating it if necessary.
 * Should be called once at server startup.
 */
export async function ensureStorageBucket(client: S3, bucketName: string) {
    let headResult: HeadBucketCommandOutput | undefined
    try {
        headResult = await client.send(
            new HeadBucketCommand({
                Bucket: bucketName,
            }),
        )
    } catch (error: unknown) {
        const name =
            error instanceof Object && "name" in error
                ? (
                      error as {
                          name: string
                      }
                  ).name
                : undefined
        const message = error instanceof Error ? error.message : undefined
        const code =
            error instanceof Object && "code" in error
                ? (
                      error as {
                          code?: string
                      }
                  ).code
                : undefined
        const cause =
            error instanceof Error && error.cause !== undefined
                ? typeof error.cause === "string"
                    ? error.cause
                    : JSON.stringify(error.cause)
                : undefined
        const stack = error instanceof Error ? error.stack : undefined
        const httpStatusCode =
            error instanceof Object &&
            "$metadata" in error &&
            error.$metadata instanceof Object &&
            "httpStatusCode" in error.$metadata
                ? (
                      error.$metadata as {
                          httpStatusCode: number
                      }
                  ).httpStatusCode
                : undefined

        if (name === "NotFound" || name === "NoSuchBucket" || httpStatusCode === 404) {
            console.info(`Bucket "${bucketName}" not found, creating it...`)
            await client.send(
                new CreateBucketCommand({
                    Bucket: bucketName,
                }),
            )
            console.info(`Bucket "${bucketName}" created.`)
            return
        }

        // RustFS (and some other S3-compatible providers) return HTTP 400 for HeadBucket
        // even when the bucket exists. Treat it as "bucket present" and continue silently.
        if (httpStatusCode === 400) {
            console.info(`Bucket "${bucketName}" assumed accessible (HeadBucket returned HTTP 400 - RustFS quirk).`)
            return
        }

        // Unexpected error - log and continue rather than crashing the server.
        console.warn(
            `HeadBucket check failed (HTTP ${httpStatusCode ?? "unknown"}, name: ${name ?? "unknown"}, ` +
                `code: ${code ?? "unknown"}, message: ${message ?? "unknown"}). ` +
                `Assuming bucket "${bucketName}" exists. Storage errors will surface at request time if misconfigured.`,
        )
        if (cause) {
            console.warn(`HeadBucket cause: ${cause}`)
        }
        if (stack) {
            console.warn(`HeadBucket stack:\n${stack}`)
        }
        return
    }

    if (headResult) {
        console.info(`Bucket "${bucketName}" is accessible.`)
    }
}
