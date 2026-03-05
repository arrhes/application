import { describe, expect, it } from "vitest"
import { signString } from "#/utilities/cookies/signString.js"

describe("signString", () => {
    const secret = "test-secret-key"

    it("returns a string containing the original value and a dot", () => {
        const signed = signString({ value: "hello", secret })
        expect(signed).toContain(".")
        expect(signed.startsWith("hello.")).toBe(true)
    })

    it("produces deterministic output for same input", () => {
        const signed1 = signString({ value: "test", secret })
        const signed2 = signString({ value: "test", secret })
        expect(signed1).toBe(signed2)
    })

    it("produces different output for different values", () => {
        const signed1 = signString({ value: "value1", secret })
        const signed2 = signString({ value: "value2", secret })
        expect(signed1).not.toBe(signed2)
    })

    it("produces different output for different secrets", () => {
        const signed1 = signString({ value: "test", secret: "secret1" })
        const signed2 = signString({ value: "test", secret: "secret2" })
        expect(signed1).not.toBe(signed2)
    })

    it("appends a base64url-encoded HMAC", () => {
        const signed = signString({ value: "data", secret })
        const parts = signed.split(".")
        expect(parts).toHaveLength(2)
        // base64url characters only
        expect(parts[1]).toMatch(/^[A-Za-z0-9_-]+$/)
    })
})
