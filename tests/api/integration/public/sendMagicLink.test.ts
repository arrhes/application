import { beforeAll, describe, expect, it } from "vitest"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest } from "../../helpers/testClient.js"

beforeAll(async () => {
    await verifyApiIsRunning()
})

describe("POST /v1/auth/magic-link", () => {
    it("accepts a valid existing email", async () => {
        const response = await apiRequest({
            method: "POST",
            path: "/v1/auth/magic-link",
            body: {
                email: "demo@arrhes.com",
            },
        })
        expect(response.status).toBe(200)
        expect(response.data).toEqual({})
    })

    it("rejects an empty body", async () => {
        const response = await apiRequest({
            method: "POST",
            path: "/v1/auth/magic-link",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("fails for a non-existent email (user not found)", async () => {
        const response = await apiRequest({
            method: "POST",
            path: "/v1/auth/magic-link",
            body: {
                email: "nonexistent@arrhes.com",
            },
        })
        // selectOne throws when no row found
        expect(response.status).toBeGreaterThanOrEqual(400)
    })
})
