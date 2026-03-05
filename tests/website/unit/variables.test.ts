import { cookiePrefix } from "src/utilities/variables.js"
import { describe, expect, it } from "vitest"

describe("variables", () => {
    it("exports the correct cookie prefix", () => {
        expect(cookiePrefix).toBe("arrhes")
    })

    it("cookie prefix is a string", () => {
        expect(typeof cookiePrefix).toBe("string")
    })
})
