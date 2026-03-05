import { beforeAll, describe, expect, it } from "vitest"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest, buildCookieString } from "../../helpers/testClient.js"

beforeAll(async () => {
    await verifyApiIsRunning()
})

describe("POST /public/sign-out", () => {
    it("signs out a signed-in user", async () => {
        // First sign in to get cookies
        const signInResponse = await apiRequest({
            path: "/public/sign-in",
            body: { email: "demo@arrhes.com", password: "demo" },
        })
        expect(signInResponse.status).toBe(200)
        const cookies = buildCookieString(signInResponse.cookies)

        // Then sign out
        const signOutResponse = await apiRequest({
            path: "/public/sign-out",
            body: {},
            cookies,
        })
        expect(signOutResponse.status).toBe(200)
        expect(signOutResponse.data).toEqual({})

        // Should reset cookies
        const setCookies = signOutResponse.cookies.join("; ")
        expect(setCookies).toContain("arrhes_is_auth")
    })

    it("succeeds even without session cookies (no-op sign-out)", async () => {
        const response = await apiRequest({
            path: "/public/sign-out",
            body: {},
        })
        expect(response.status).toBe(200)
        expect(response.data).toEqual({})
    })

    it("invalidates the session after sign-out", async () => {
        // Sign in
        const signInResponse = await apiRequest({
            path: "/public/sign-in",
            body: { email: "demo@arrhes.com", password: "demo" },
        })
        const cookies = buildCookieString(signInResponse.cookies)

        // Sign out
        await apiRequest({
            path: "/public/sign-out",
            body: {},
            cookies,
        })

        // Try to use the old session to read user session
        const sessionResponse = await apiRequest({
            path: "/auth/read-user-session",
            body: {},
            cookies,
        })
        // Should fail because session was deactivated
        expect(sessionResponse.status).toBe(401)
    })
})
