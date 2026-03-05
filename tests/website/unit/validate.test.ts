import { describe, expect, it, vi } from "vitest"

// Mock import.meta.env before importing clientError (which validate depends on)
vi.stubEnv("VITE_ENV", "test")

import { ClientError } from "src/utilities/clientError.js"
import { validate } from "src/utilities/validate.js"
import * as v from "valibot"

describe("validate", () => {
    const schema = v.object({
        name: v.string(),
        age: v.number(),
    })

    it("returns success with parsed data for valid input", () => {
        const result = validate({
            schema,
            data: { name: "Alice", age: 30 },
        })
        expect(result.success).toBe(true)
        expect(result.data).toEqual({ name: "Alice", age: 30 })
        expect(result.error).toBeUndefined()
    })

    it("returns failure with ClientError for invalid input", () => {
        const result = validate({
            schema,
            data: { name: 123, age: "not a number" },
        })
        expect(result.success).toBe(false)
        expect(result.data).toBeUndefined()
        expect(result.error).toBeInstanceOf(ClientError)
    })

    it("returns failure for missing required fields", () => {
        const result = validate({
            schema,
            data: { name: "Alice" },
        })
        expect(result.success).toBe(false)
        expect(result.error).toBeInstanceOf(ClientError)
    })

    it("returns failure for empty object", () => {
        const result = validate({
            schema,
            data: {},
        })
        expect(result.success).toBe(false)
        expect(result.error).toBeInstanceOf(ClientError)
    })

    it("returns success for a simple string schema", () => {
        const stringSchema = v.string()
        const result = validate({
            schema: stringSchema,
            data: "hello",
        })
        expect(result.success).toBe(true)
        expect(result.data).toBe("hello")
    })
})
