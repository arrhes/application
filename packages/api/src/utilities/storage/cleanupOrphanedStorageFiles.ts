import { models } from "@arrhes/application-metadata"
import { DeleteObjectCommand, ListObjectsV2Command, type ListObjectsV2CommandOutput } from "@aws-sdk/client-s3"
import { inArray } from "drizzle-orm"
import type { getClients } from "../getClients.js"
import type { getEnv } from "../getEnv.js"

const FILE_KEY_REGEX = /^organizations\/[^/]+\/storage\/([^/]+)$/
const DB_CHUNK_SIZE = 500

type StorageCandidate = {
    key: string
    idFile: string
}

function extractCandidateFromKey(key: string): StorageCandidate | undefined {
    const match = FILE_KEY_REGEX.exec(key)
    if (!match) {
        return undefined
    }

    return {
        key: key,
        idFile: match[1],
    }
}

async function listAllFileCandidates(
    storage: Awaited<ReturnType<typeof getClients>>["storage"],
    bucketName: string,
): Promise<StorageCandidate[]> {
    const output: StorageCandidate[] = []
    let continuationToken: string | undefined

    while (true) {
        const response: ListObjectsV2CommandOutput = await storage.send(
            new ListObjectsV2Command({
                Bucket: bucketName,
                Prefix: "organizations/",
                ContinuationToken: continuationToken,
                MaxKeys: 1000,
            }),
        )

        for (const object of response.Contents ?? []) {
            if (!object.Key) {
                continue
            }
            const candidate = extractCandidateFromKey(object.Key)
            if (candidate !== undefined) {
                output.push(candidate)
            }
        }

        if (!response.IsTruncated) {
            break
        }

        continuationToken = response.NextContinuationToken
    }

    return output
}

async function getExistingFileIds(
    sql: Awaited<ReturnType<typeof getClients>>["sql"],
    ids: string[],
): Promise<Set<string>> {
    const existingIds = new Set<string>()

    for (let index = 0; index < ids.length; index += DB_CHUNK_SIZE) {
        const chunk = ids.slice(index, index + DB_CHUNK_SIZE)
        if (chunk.length === 0) {
            continue
        }

        const rows = await sql
            .select({
                id: models.file.id,
            })
            .from(models.file)
            .where(inArray(models.file.id, chunk))

        for (const row of rows) {
            existingIds.add(row.id)
        }
    }

    return existingIds
}

export async function cleanupOrphanedStorageFiles(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
}): Promise<void> {
    const candidates = await listAllFileCandidates(
        parameters.var.clients.storage,
        parameters.var.env.STORAGE_BUCKET_NAME,
    )
    if (candidates.length === 0) {
        return
    }

    const uniqueIds = [
        ...new Set(candidates.map((candidate) => candidate.idFile)),
    ]
    const existingIds = await getExistingFileIds(parameters.var.clients.sql, uniqueIds)

    const orphaned = candidates.filter((candidate) => !existingIds.has(candidate.idFile))
    if (orphaned.length === 0) {
        return
    }

    for (const file of orphaned) {
        await parameters.var.clients.storage.send(
            new DeleteObjectCommand({
                Bucket: parameters.var.env.STORAGE_BUCKET_NAME,
                Key: file.key,
            }),
        )
    }

    console.log(`[cleanupOrphanedStorageFiles] Deleted ${orphaned.length} orphan storage object(s).`)
}
