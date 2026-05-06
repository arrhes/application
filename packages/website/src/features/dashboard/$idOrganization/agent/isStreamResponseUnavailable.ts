type StreamResponseLike = {
    ok: boolean
    body: ReadableStream<Uint8Array<ArrayBufferLike>> | null
}

type HealthyStreamResponse = {
    ok: true
    body: ReadableStream<Uint8Array<ArrayBufferLike>>
}

export function isHealthyStreamResponse(response: StreamResponseLike): response is HealthyStreamResponse {
    return response.ok && response.body !== null
}
