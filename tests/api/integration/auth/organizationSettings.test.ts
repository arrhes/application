import { beforeAll, describe, expect, it } from "vitest"
import { type AuthSession, authenticatedRequest, getDemoOrganizationId, signInAsDemo } from "../../helpers/auth.js"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest } from "../../helpers/testClient.js"

let session: AuthSession
let idOrganization: string
let idDemoOrganizationUser: string

beforeAll(async () => {
    await verifyApiIsRunning()
    session = await signInAsDemo()
    idOrganization = await getDemoOrganizationId(session)

    // Fetch the demo user's organization user record for downstream tests
    const response = await authenticatedRequest({
        session,
        path: "/auth/read-all-organization-users",
        body: { idOrganization },
    })
    const users = response.data as any[]
    idDemoOrganizationUser = users[0].id
})

describe("POST /auth/read-all-organization-users", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-all-organization-users",
            body: { idOrganization },
        })
        expect(response.status).toBe(401)
    })

    it("returns the list of organization users", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-all-organization-users",
            body: { idOrganization },
        })
        expect(response.status).toBe(200)

        const users = response.data as any[]
        expect(Array.isArray(users)).toBe(true)
        expect(users.length).toBeGreaterThan(0)
        expect(users[0]).toHaveProperty("id")
        expect(users[0]).toHaveProperty("user")
    })
})

describe("POST /auth/read-one-organization-user", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-one-organization-user",
            body: { idOrganizationUser: "fake-id" },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-one-organization-user",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("returns the organization user with the user data", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-one-organization-user",
            body: { idOrganizationUser: idDemoOrganizationUser },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("id")
        expect(data.id).toBe(idDemoOrganizationUser)
        expect(data).toHaveProperty("user")
        expect(data.user).toHaveProperty("email")
    })
})

describe("POST /auth/update-one-organization", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/update-one-organization",
            body: { idOrganization, name: "hacked" },
        })
        expect(response.status).toBe(401)
    })

    it("updates the organization name", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-one-organization",
            body: { idOrganization, name: "Demo company" },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("id")
        expect(data.name).toBe("Demo company")
    })
})

describe("POST /auth/create-one-organization-user", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/create-one-organization-user",
            body: { idOrganization, isAdmin: false, user: { email: "test@example.com" } },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/create-one-organization-user",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("returns an error for a non-existent user email", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/create-one-organization-user",
            body: { idOrganization, isAdmin: false, user: { email: "nonexistent@example.com" } },
        })
        // selectOne throws 500 when the user is not found
        expect(response.status).toBe(500)
    })
})

describe("POST /auth/update-one-organization-user", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/update-one-organization-user",
            body: { idOrganization, idOrganizationUser: "fake-id", isAdmin: true },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-one-organization-user",
            body: {},
        })
        expect(response.status).toBe(400)
    })
})

describe("POST /auth/delete-one-organization-user", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/delete-one-organization-user",
            body: { idOrganization, idOrganizationUser: "fake-id" },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/delete-one-organization-user",
            body: {},
        })
        expect(response.status).toBe(400)
    })
})
