import { beforeAll, describe, expect, it } from "vitest"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest } from "../../helpers/testClient.js"

beforeAll(async () => {
    await verifyApiIsRunning()
})

describe("POST /public/sign-up", () => {
    it("creates a new user with valid data", async () => {
        const uniqueEmail = `test-signup-${Date.now()}@arrhes.com`
        const response = await apiRequest({
            path: "/public/sign-up",
            body: {
                email: uniqueEmail,
                password: "TestPassword123!",
                passwordCheck: "TestPassword123!",
            },
        })
        expect(response.status).toBe(200)
        expect(response.data).toEqual({})

        // Should set session cookies (auto-login after sign up)
        const cookieString = response.cookies.join("; ")
        expect(cookieString).toContain("arrhes_id_user_session")
        expect(cookieString).toContain("arrhes_is_auth")
    })

    it("rejects mismatched passwords", async () => {
        const uniqueEmail = `test-mismatch-${Date.now()}@arrhes.com`
        const response = await apiRequest({
            path: "/public/sign-up",
            body: {
                email: uniqueEmail,
                password: "TestPassword123!",
                passwordCheck: "DifferentPassword456!",
            },
        })
        expect(response.status).toBe(400)
    })

    it("rejects empty body", async () => {
        const response = await apiRequest({
            path: "/public/sign-up",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("rejects missing email", async () => {
        const response = await apiRequest({
            path: "/public/sign-up",
            body: {
                password: "TestPassword123!",
                passwordCheck: "TestPassword123!",
            },
        })
        expect(response.status).toBe(400)
    })

    it("rejects duplicate email (existing demo user)", async () => {
        const response = await apiRequest({
            path: "/public/sign-up",
            body: {
                email: "demo@arrhes.com",
                password: "SomePassword123!",
                passwordCheck: "SomePassword123!",
            },
        })
        // Should fail because email already exists (unique constraint)
        expect(response.status).toBeGreaterThanOrEqual(400)
    })
})
