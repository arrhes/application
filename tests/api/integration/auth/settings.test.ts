import { beforeAll, describe, expect, it } from "vitest"
import { type AuthSession, authenticatedRequest, signInAsDemo } from "../../helpers/auth.js"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest } from "../../helpers/testClient.js"

let session: AuthSession

beforeAll(async () => {
    await verifyApiIsRunning()
    session = await signInAsDemo()
})

describe("POST /auth/read-user-session", () => {
    it("returns the current user session and user data", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-user-session",
            body: {},
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("id")
        expect(data).toHaveProperty("idUser")
        expect(data).toHaveProperty("isActive")
        expect(data.isActive).toBe(true)
        expect(data).toHaveProperty("user")
        expect(data.user).toHaveProperty("id")
        expect(data.user).toHaveProperty("email")
        expect(data.user.email).toBe("demo@arrhes.com")
    })

    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-user-session",
            body: {},
        })
        expect(response.status).toBe(401)
    })
})

describe("POST /auth/update-user", () => {
    it("updates the user alias", async () => {
        const newAlias = `TestAlias-${Date.now()}`
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-user",
            body: { alias: newAlias },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("id")
        expect(data.alias).toBe(newAlias)
    })

    it("allows setting alias to null", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-user",
            body: { alias: null },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data.alias).toBeNull()
    })

    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/update-user",
            body: { alias: "test" },
        })
        expect(response.status).toBe(401)
    })
})

describe("POST /auth/update-user-password", () => {
    it("succeeds when new passwords match and current password is correct", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-user-password",
            body: {
                currentPassword: "demo",
                newPassword: "NewPassword123!",
                newPasswordCheck: "NewPassword123!",
            },
        })
        expect(response.status).toBe(200)

        // Restore original password so other tests are not affected
        const restoreResponse = await authenticatedRequest({
            session,
            path: "/auth/update-user-password",
            body: {
                currentPassword: "NewPassword123!",
                newPassword: "demo",
                newPasswordCheck: "demo",
            },
        })
        expect(restoreResponse.status).toBe(200)
    })

    it("rejects request with wrong current password and mismatched new passwords", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-user-password",
            body: {
                currentPassword: "wrong_password",
                newPassword: "NewPassword123!",
                newPasswordCheck: "DifferentPassword456!",
            },
        })
        // Passwords don't match so it fails on password mismatch check
        expect(response.status).toBe(400)
    })

    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/update-user-password",
            body: {
                currentPassword: "demo",
                newPassword: "NewPassword123!",
                newPasswordCheck: "NewPassword123!",
            },
        })
        expect(response.status).toBe(401)
    })
})
