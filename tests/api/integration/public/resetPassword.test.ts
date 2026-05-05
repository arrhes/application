import { describe, expect, it } from "vitest"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest } from "../../helpers/testClient.js"

describe("POST /public/reset-password", () => {
    it("resets password for an existing user", async () => {
        await verifyApiIsRunning()

        const response = await apiRequest({
            path: "/public/reset-password",
            body: {
                email: "demo@arrhes.com",
            },
        })

        expect(response.status).toBe(200)
    })
})
