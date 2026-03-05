import { describe, expect, it } from "vitest"
import { serializeCookie } from "#/utilities/cookies/serializeCookie.js"

describe("serializeCookie", () => {
    it("serializes a basic name-value cookie", () => {
        const result = serializeCookie({ name: "test", value: "hello" })
        expect(result).toBe("test=hello")
    })

    it("URL-encodes name and value", () => {
        const result = serializeCookie({ name: "my cookie", value: "my value" })
        expect(result).toBe("my%20cookie=my%20value")
    })

    it("includes Max-Age option", () => {
        const result = serializeCookie({
            name: "test",
            value: "val",
            options: { maxAge: 3600 },
        })
        expect(result).toContain("; Max-Age=3600")
    })

    it("includes Expires option as UTC string", () => {
        const date = new Date("2025-01-01T00:00:00Z")
        const result = serializeCookie({
            name: "test",
            value: "val",
            options: { expires: date },
        })
        expect(result).toContain("; Expires=Wed, 01 Jan 2025 00:00:00 GMT")
    })

    it("includes Domain option", () => {
        const result = serializeCookie({
            name: "test",
            value: "val",
            options: { domain: ".example.com" },
        })
        expect(result).toContain("; Domain=.example.com")
    })

    it("includes Path option", () => {
        const result = serializeCookie({
            name: "test",
            value: "val",
            options: { path: "/" },
        })
        expect(result).toContain("; Path=/")
    })

    it("includes HttpOnly flag", () => {
        const result = serializeCookie({
            name: "test",
            value: "val",
            options: { httpOnly: true },
        })
        expect(result).toContain("; HttpOnly")
    })

    it("includes Secure flag", () => {
        const result = serializeCookie({
            name: "test",
            value: "val",
            options: { secure: true },
        })
        expect(result).toContain("; Secure")
    })

    it("includes SameSite option", () => {
        const result = serializeCookie({
            name: "test",
            value: "val",
            options: { sameSite: "Strict" },
        })
        expect(result).toContain("; SameSite=Strict")
    })

    it("includes all options together", () => {
        const result = serializeCookie({
            name: "session",
            value: "abc",
            options: {
                maxAge: 86400,
                httpOnly: true,
                secure: true,
                sameSite: "None",
                path: "/",
                domain: ".arrhes.com",
            },
        })
        expect(result).toContain("session=abc")
        expect(result).toContain("; Max-Age=86400")
        expect(result).toContain("; Domain=.arrhes.com")
        expect(result).toContain("; Path=/")
        expect(result).toContain("; HttpOnly")
        expect(result).toContain("; Secure")
        expect(result).toContain("; SameSite=None")
    })

    it("does not include flags when options is undefined", () => {
        const result = serializeCookie({ name: "a", value: "b" })
        expect(result).toBe("a=b")
    })

    it("floors Max-Age value", () => {
        const result = serializeCookie({
            name: "test",
            value: "val",
            options: { maxAge: 3600.7 },
        })
        expect(result).toContain("; Max-Age=3600")
    })
})
