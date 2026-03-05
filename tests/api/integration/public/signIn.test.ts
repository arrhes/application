import { beforeAll, describe, expect, it } from "vitest"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest } from "../../helpers/testClient.js"

beforeAll(async () => {
    await verifyApiIsRunning()
})

describe("POST /public/sign-in", () => {
    it("signs in with valid demo credentials", async () => {
        const response = await apiRequest({
            path: "/public/sign-in",
            body: { email: "demo@arrhes.com", password: "demo" },
        })
        expect(response.status).toBe(200)
        expect(response.data).toEqual({})
        expect(response.cookies.length).toBeGreaterThanOrEqual(2)

        // Should set session cookie and is_auth cookie
        const cookieString = response.cookies.join("; ")
        expect(cookieString).toContain("arrhes_id_user_session")
        expect(cookieString).toContain("arrhes_is_auth")
    })

    it("rejects invalid password", async () => {
        const response = await apiRequest({
            path: "/public/sign-in",
            body: { email: "demo@arrhes.com", password: "wrong_password" },
        })
        expect(response.status).toBe(400)
    })

    it("rejects non-existent user", async () => {
        const response = await apiRequest({
            path: "/public/sign-in",
            body: { email: "nonexistent@arrhes.com", password: "demo" },
        })
        expect(response.status).toBeGreaterThanOrEqual(400)
    })

    it("rejects empty body", async () => {
        const response = await apiRequest({
            path: "/public/sign-in",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("rejects missing password", async () => {
        const response = await apiRequest({
            path: "/public/sign-in",
            body: { email: "demo@arrhes.com" },
        })
        expect(response.status).toBe(400)
    })
})
