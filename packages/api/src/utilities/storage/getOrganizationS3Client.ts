import { S3 } from "@aws-sdk/client-s3"

export function getOrganizationS3Client(org: {
    storageEndpoint?: string | null
    storageAccessKey?: string | null
    storageSecretKey?: string | null
    storageRegion?: string | null
}) {
    return new S3({
        endpoint: org.storageEndpoint ?? undefined,
        credentials: {
            accessKeyId: org.storageAccessKey ?? "",
            secretAccessKey: org.storageSecretKey ?? "",
        },
        region: org.storageRegion ?? "fr-par",
        forcePathStyle: true,
    })
}
