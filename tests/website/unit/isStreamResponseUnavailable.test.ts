import { describe, expect, it } from "vitest"
import { isHealthyStreamResponse } from "../../../packages/dashboard/src/features/dashboard/$idOrganization/agent/isStreamResponseUnavailable.ts"

describe("isHealthyStreamResponse", () => {
    it("returns false when response is not ok", () => {
        const result = isHealthyStreamResponse({
            ok: false,
            body: new ReadableStream<Uint8Array<ArrayBufferLike>>(),
        })

        expect(result).toBe(false)
    })

    it("returns false when response body is missing", () => {
        const result = isHealthyStreamResponse({
            ok: true,
            body: null,
        })

        expect(result).toBe(false)
    })

    it("returns true for a healthy stream response", () => {
        const result = isHealthyStreamResponse({
            ok: true,
            body: new ReadableStream<Uint8Array<ArrayBufferLike>>(),
        })

        expect(result).toBe(true)
    })
})
