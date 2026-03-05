import { describe, expect, it } from "vitest"
import { signString } from "#/utilities/cookies/signString.js"
import { unsignString } from "#/utilities/cookies/unsignString.js"

describe("unsignString", () => {
    const secret = "test-secret-key"

    it("returns the original value from a valid signed string", () => {
        const signed = signString({ value: "my-session-id", secret })
        const result = unsignString({ signedValue: signed, secret })
        expect(result).toBe("my-session-id")
    })

    it("returns undefined for undefined input", () => {
        const result = unsignString({ signedValue: undefined, secret })
        expect(result).toBeUndefined()
    })

    it("throws for a tampered signature", () => {
        const signed = signString({ value: "data", secret })
        const tampered = `${signed.slice(0, -1)}X`
        expect(() => unsignString({ signedValue: tampered, secret })).toThrow()
    })

    it("throws for a wrong secret", () => {
        const signed = signString({ value: "data", secret: "correct-secret" })
        expect(() => unsignString({ signedValue: signed, secret: "wrong-secret" })).toThrow()
    })

    it("throws for a string without a dot separator", () => {
        expect(() => unsignString({ signedValue: "nodot", secret })).toThrow()
    })

    it("roundtrips with signString for complex values", () => {
        const complexValue = "user_abc123-xyz_456"
        const signed = signString({ value: complexValue, secret })
        const unsigned = unsignString({ signedValue: signed, secret })
        expect(unsigned).toBe(complexValue)
    })
})
