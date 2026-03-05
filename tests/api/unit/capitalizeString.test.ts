import { describe, expect, it } from "vitest"
import { capitalizeString } from "#/utilities/capitalizeString.js"

describe("capitalizeString", () => {
    it("capitalizes the first letter of a lowercase string", () => {
        expect(capitalizeString("hello")).toBe("Hello")
    })

    it("returns the same string if already capitalized", () => {
        expect(capitalizeString("Hello")).toBe("Hello")
    })

    it("handles a single character", () => {
        expect(capitalizeString("a")).toBe("A")
    })

    it("returns an empty string for empty input", () => {
        expect(capitalizeString("")).toBe("")
    })

    it("does not alter characters after the first", () => {
        expect(capitalizeString("hELLO wORLD")).toBe("HELLO wORLD")
    })

    it("handles strings starting with a number", () => {
        expect(capitalizeString("123abc")).toBe("123abc")
    })

    it("handles accented characters", () => {
        expect(capitalizeString("écriture")).toBe("Écriture")
    })
})
