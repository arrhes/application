import { describe, expect, it } from "vitest"
import { parseCookies } from "#/utilities/cookies/parseCookies.js"

describe("parseCookies", () => {
    it("parses a single cookie", () => {
        const result = parseCookies({ value: "name=value" })
        expect(result).toEqual({ name: "value" })
    })

    it("parses multiple cookies separated by semicolons", () => {
        const result = parseCookies({ value: "a=1; b=2; c=3" })
        expect(result).toEqual({ a: "1", b: "2", c: "3" })
    })

    it("returns an empty object for undefined value", () => {
        const result = parseCookies({ value: undefined })
        expect(result).toEqual({})
    })

    it("handles URL-encoded values", () => {
        const result = parseCookies({ value: "name=hello%20world" })
        expect(result).toEqual({ name: "hello world" })
    })

    it("handles cookies with equals signs in the value", () => {
        const result = parseCookies({ value: "token=abc=def=ghi" })
        expect(result).toEqual({ token: "abc=def=ghi" })
    })

    it("handles empty cookie string", () => {
        const result = parseCookies({ value: "" })
        expect(result).toEqual({ "": "" })
    })

    it("handles cookies with extra whitespace", () => {
        const result = parseCookies({ value: "  a=1  ;  b=2  " })
        expect(result).toEqual({ a: "1", b: "2" })
    })
})
