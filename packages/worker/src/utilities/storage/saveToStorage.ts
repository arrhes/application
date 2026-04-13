import type { routeDefinition } from "@evidencesystem/schemas/utilities"
import type * as v from "valibot"
import { putObject } from "#src/utilities/storage/putObject.js"

export async function saveToStorage<
    TSchema extends Parameters<typeof routeDefinition>[0]["schemas"]["return"],
    TData extends v.InferOutput<TSchema>,
>(parameters: { storageKey: string; schema: TSchema; data: TData; metadata: Record<string, string> }) {
    const buffer = Buffer.from(JSON.stringify(parameters.data), "utf-8")

    const _storageResponse = await putObject({
        storageKey: parameters.storageKey,
        body: buffer,
        contentLength: buffer.length,
        contentType: "application/json",
        metadata: parameters.metadata,
    })

    return parameters.data
}
