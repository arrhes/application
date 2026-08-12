import { beforeAll, describe, expect, it } from "vitest"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest } from "../../helpers/testClient.js"

beforeAll(async () => {
    await verifyApiIsRunning()
})

describe("POST /v1/auth/sign-in", () => {
    it("signs in with valid demo credentials", async () => {
        const response = await apiRequest({
            method: "POST",
            path: "/v1/auth/sign-in",
            body: {
                email: "demo@comptasse.com",
                password: "demo",
            },
        })
        expect(response.status).toBe(200)
        expect(response.data).toEqual({})
        expect(response.cookies.length).toBeGreaterThanOrEqual(2)

        // Should set session cookie and is_auth cookie
        const cookieString = response.cookies.join("; ")
        expect(cookieString).toContain("comptasse_id_user_session")
        expect(cookieString).toContain("comptasse_is_auth")
    })

    it("rejects invalid password", async () => {
        const response = await apiRequest({
            method: "POST",
            path: "/v1/auth/sign-in",
            body: {
                email: "demo@comptasse.com",
                password: "wrong_password",
            },
        })
        expect(response.status).toBe(400)
    })

    it("rejects non-existent user", async () => {
        const response = await apiRequest({
            method: "POST",
            path: "/v1/auth/sign-in",
            body: {
                email: "nonexistent@comptasse.com",
                password: "demo",
            },
        })
        expect(response.status).toBeGreaterThanOrEqual(400)
    })

    it("rejects empty body", async () => {
        const response = await apiRequest({
            method: "POST",
            path: "/v1/auth/sign-in",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("rejects missing password", async () => {
        const response = await apiRequest({
            method: "POST",
            path: "/v1/auth/sign-in",
            body: {
                email: "demo@comptasse.com",
            },
        })
        expect(response.status).toBe(400)
    })
})
