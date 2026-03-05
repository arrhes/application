import { describe, expect, it } from "vitest"
import { safeParseJSON } from "#/utilities/safeParseJSON.js"

describe("safeParseJSON", () => {
    it("parses a valid complete JSON string", () => {
        const result = safeParseJSON({ rawString: '{"key": "value"}' })
        expect(result).toEqual({ key: "value" })
    })

    it("parses a truncated JSON string by completing it", () => {
        const result = safeParseJSON({ rawString: '{"key": "value"' })
        expect(result).toEqual({ key: "value" })
    })

    it("parses an array", () => {
        const result = safeParseJSON({ rawString: "[1, 2, 3]" })
        expect(result).toEqual([1, 2, 3])
    })

    it("throws for completely invalid input", () => {
        expect(() => safeParseJSON({ rawString: "not json at all !!!" })).toThrow()
    })

    it("handles nested structures", () => {
        const result = safeParseJSON({ rawString: '{"a": {"b": "c"}}' })
        expect(result).toEqual({ a: { b: "c" } })
    })
})
