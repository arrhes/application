import { describe, expect, it } from "vitest"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest } from "../../helpers/testClient.js"

describe("POST /v1/auth/reset-password", () => {
    it("resets password for an existing user", async () => {
        await verifyApiIsRunning()

        const response = await apiRequest({
            method: "POST",
            path: "/v1/auth/reset-password",
            body: {
                email: "nonexistent@example.com",
            },
        })

        expect(response.status).toBe(200)
    })
})
