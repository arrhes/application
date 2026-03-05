import { describe, expect, it } from "vitest"
import { Exception } from "#/utilities/exception.js"

describe("Exception", () => {
    it("creates an exception with an internal message", () => {
        const ex = new Exception({ internalMessage: "Something failed" })
        expect(ex.internalMessage).toBe("Something failed")
        expect(ex.message).toBe("Something failed")
    })

    it("sets a default external message of 'Internal error'", () => {
        const ex = new Exception({ internalMessage: "DB error" })
        expect(ex.externalMessage).toBe("Internal error")
    })

    it("allows a custom external message", () => {
        const ex = new Exception({
            internalMessage: "DB error",
            externalMessage: "Something went wrong",
        })
        expect(ex.externalMessage).toBe("Something went wrong")
    })

    it("stores the status code", () => {
        const ex = new Exception({
            internalMessage: "Not found",
            statusCode: 404,
        })
        expect(ex.statusCode).toBe(404)
    })

    it("stores a cause string", () => {
        const ex = new Exception({
            internalMessage: "fail",
            cause: "detailed reason",
        })
        expect(ex.cause).toBe("detailed reason")
    })

    it("extracts cause from a rawError Error instance", () => {
        const rawError = new Error("inner error")
        rawError.cause = "inner cause"
        const ex = new Exception({
            internalMessage: "wrapper",
            rawError,
        })
        expect(ex.cause).toBe("inner cause")
    })

    it("preserves the stack from rawError", () => {
        const rawError = new Error("inner")
        const ex = new Exception({
            internalMessage: "wrapper",
            rawError,
        })
        expect(ex.stack).toBe(rawError.stack)
    })

    it("is an instance of Error", () => {
        const ex = new Exception({ internalMessage: "test" })
        expect(ex).toBeInstanceOf(Error)
    })

    it("defaults statusCode to undefined when not provided", () => {
        const ex = new Exception({ internalMessage: "test" })
        expect(ex.statusCode).toBeUndefined()
    })
})
