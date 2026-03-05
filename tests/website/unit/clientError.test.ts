import { describe, expect, it, vi } from "vitest"

// Mock import.meta.env to avoid console.trace in tests
vi.stubEnv("VITE_ENV", "test")

import { ClientError } from "src/utilities/clientError.js"

describe("ClientError", () => {
    it("creates an error with a message", () => {
        const error = new ClientError({ message: "Something failed" })
        expect(error.message).toBe("Something failed")
    })

    it("creates an error with a message and cause", () => {
        const error = new ClientError({
            message: "Request failed",
            cause: "Network timeout",
        })
        expect(error.message).toBe("Request failed")
        expect(error.cause).toBe("Network timeout")
    })

    it("extracts message from a raw Error", () => {
        const rawError = new Error("Original error")
        const error = new ClientError({ rawError })
        expect(error.message).toBe("Original error")
        expect(error.stack).toBeDefined()
    })

    it("copies properties from another ClientError", () => {
        const original = new ClientError({
            message: "Original",
            cause: "Some cause",
        })
        const wrapped = new ClientError({ rawError: original })
        expect(wrapped.message).toBe("Original")
        expect(wrapped.cause).toBe("Some cause")
    })

    it("sets 'Unknown error' when no message or rawError is provided", () => {
        const error = new ClientError({})
        expect(error.message).toBe("Unknown error")
    })

    it("has a stack trace", () => {
        const error = new ClientError({ message: "test" })
        expect(error.stack).toBeDefined()
    })

    it("extracts cause from raw Error when no explicit cause given", () => {
        const rawError = new Error("msg")
        rawError.cause = "error cause"
        const error = new ClientError({ rawError })
        expect(error.cause).toBe("error cause")
    })
})
