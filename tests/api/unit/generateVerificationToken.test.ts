import { describe, expect, it } from "vitest"
import { generateVerificationToken } from "#/utilities/generateVerificationToken.js"

describe("generateVerificationToken", () => {
    it("returns a string of exactly 6 characters", () => {
        const token = generateVerificationToken()
        expect(token).toHaveLength(6)
    })

    it("returns only numeric characters", () => {
        for (let i = 0; i < 50; i++) {
            const token = generateVerificationToken()
            expect(token).toMatch(/^\d{6}$/)
        }
    })

    it("pads small numbers with leading zeros", () => {
        // Run many times to increase chance of hitting a small random number
        const tokens: string[] = []
        for (let i = 0; i < 100; i++) {
            tokens.push(generateVerificationToken())
        }
        // All should be exactly 6 chars regardless of the random value
        for (const token of tokens) {
            expect(token).toHaveLength(6)
        }
    })

    it("generates different tokens across calls (probabilistic)", () => {
        const tokens = new Set<string>()
        for (let i = 0; i < 20; i++) {
            tokens.add(generateVerificationToken())
        }
        // Extremely unlikely all 20 are identical
        expect(tokens.size).toBeGreaterThan(1)
    })
})
