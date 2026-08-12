import { beforeAll, describe, expect, it } from "vitest"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest, buildCookieString } from "../../helpers/testClient.js"

beforeAll(async () => {
    await verifyApiIsRunning()
})

describe("POST /v1/auth/sign-out", () => {
    it("signs out a signed-in user", async () => {
        // First sign in to get cookies
        const signInResponse = await apiRequest({
            method: "POST",
            path: "/v1/auth/sign-in",
            body: {
                email: "demo@comptasse.com",
                password: "demo",
            },
        })
        expect(signInResponse.status).toBe(200)
        const cookies = buildCookieString(signInResponse.cookies)

        // Then sign out
        const signOutResponse = await apiRequest({
            method: "POST",
            path: "/v1/auth/sign-out",
            body: {},
            cookies,
        })
        expect(signOutResponse.status).toBe(200)
        expect(signOutResponse.data).toEqual({})

        // Should reset cookies
        const setCookies = signOutResponse.cookies.join("; ")
        expect(setCookies).toContain("comptasse_is_auth")
    })

    it("succeeds even without session cookies (no-op sign-out)", async () => {
        const response = await apiRequest({
            method: "POST",
            path: "/v1/auth/sign-out",
            body: {},
        })
        expect(response.status).toBe(200)
        expect(response.data).toEqual({})
    })

    it("invalidates the session after sign-out", async () => {
        // Sign in
        const signInResponse = await apiRequest({
            method: "POST",
            path: "/v1/auth/sign-in",
            body: {
                email: "demo@comptasse.com",
                password: "demo",
            },
        })
        const cookies = buildCookieString(signInResponse.cookies)

        // Sign out
        await apiRequest({
            method: "POST",
            path: "/v1/auth/sign-out",
            body: {},
            cookies,
        })

        // Try to use the old session to read user session
        const sessionResponse = await apiRequest({
            method: "GET",
            path: "/v1/users/me",
            cookies,
        })
        // Should fail because session was deactivated
        expect(sessionResponse.status).toBe(401)
    })
})
