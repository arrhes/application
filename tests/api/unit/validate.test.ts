import * as v from "valibot"
import { describe, expect, it } from "vitest"
import { validate } from "#/utilities/validate.js"

describe("validate", () => {
    it("returns the parsed output for valid data", () => {
        const schema = v.object({
            name: v.string(),
            age: v.number(),
        })
        const result = validate({
            schema,
            data: { name: "John", age: 30 },
        })
        expect(result).toEqual({ name: "John", age: 30 })
    })

    it("throws an Exception for invalid data", () => {
        const schema = v.object({
            name: v.string(),
        })
        expect(() =>
            validate({
                schema,
                data: { name: 123 } as any,
            }),
        ).toThrow()
    })

    it("throws an Exception with statusCode 500 for invalid data", () => {
        const schema = v.object({
            email: v.pipe(v.string(), v.email()),
        })
        try {
            validate({
                schema,
                data: { email: "not-an-email" } as any,
            })
            expect.unreachable("Should have thrown")
        } catch (error: any) {
            expect(error.statusCode).toBe(500)
            expect(error.internalMessage).toBe("Invalid data")
        }
    })

    it("strips unknown keys (default valibot behavior)", () => {
        const schema = v.object({
            name: v.string(),
        })
        const result = validate({
            schema,
            data: { name: "John", extra: "field" } as any,
        })
        expect(result).toEqual({ name: "John" })
    })

    it("validates nested objects", () => {
        const schema = v.object({
            user: v.object({
                name: v.string(),
            }),
        })
        const result = validate({
            schema,
            data: { user: { name: "Jane" } },
        })
        expect(result).toEqual({ user: { name: "Jane" } })
    })
})
