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
        method: "GET",
        path: `/organizations/${idOrganization}/users`,
    })
    const users = response.data as any[]
    idDemoOrganizationUser = users[0].id
})

describe("GET /organizations/:idOrganization/users", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "GET",
            path: `/organizations/${idOrganization}/users`,
        })
        expect(response.status).toBe(401)
    })

    it("returns the list of organization users", async () => {
        const response = await authenticatedRequest({
            session,
            method: "GET",
            path: `/organizations/${idOrganization}/users`,
        })
        expect(response.status).toBe(200)

        const users = response.data as any[]
        expect(Array.isArray(users)).toBe(true)
        expect(users.length).toBeGreaterThan(0)
        expect(users[0]).toHaveProperty("id")
        expect(users[0]).toHaveProperty("user")
    })
})

describe("GET /organizations/:idOrganization/users/:idOrganizationUser", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "GET",
            path: `/organizations/${idOrganization}/users/fake-id`,
        })
        expect(response.status).toBe(401)
    })

    it("returns the organization user with the user data", async () => {
        const response = await authenticatedRequest({
            session,
            method: "GET",
            path: `/organizations/${idOrganization}/users/${idDemoOrganizationUser}`,
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("id")
        expect(data.id).toBe(idDemoOrganizationUser)
        expect(data).toHaveProperty("user")
        expect(data.user).toHaveProperty("email")
    })
})

describe("PATCH /organizations/:idOrganization", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "PATCH",
            path: `/organizations/${idOrganization}`,
            body: {
                name: "hacked",
            },
        })
        expect(response.status).toBe(401)
    })

    it("updates the organization name", async () => {
        const response = await authenticatedRequest({
            session,
            method: "PATCH",
            path: `/organizations/${idOrganization}`,
            body: {
                name: "Demo company",
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("id")
        expect(data.name).toBe("Demo company")
    })
})

describe("POST /organizations/:idOrganization/users", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "POST",
            path: `/organizations/${idOrganization}/users`,
            body: {
                isAdmin: false,
                user: {
                    email: "test@example.com",
                },
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            method: "POST",
            path: `/organizations/${idOrganization}/users`,
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("invites a new user when the email does not already exist", async () => {
        const response = await authenticatedRequest({
            session,
            method: "POST",
            path: `/organizations/${idOrganization}/users`,
            body: {
                isAdmin: false,
                user: {
                    email: `nonexistent-${Date.now()}@example.com`,
                },
            },
        })
        // Adding an unknown email invites the user: a new user is created with a
        // temporary password and linked to the organization.
        expect(response.status).toBe(200)
        expect(response.data.idOrganization).toBe(idOrganization)
        expect(response.data.isAdmin).toBe(false)
        expect(typeof response.data.temporaryPassword).toBe("string")
        expect(response.data.temporaryPassword).not.toBe("")
    })
})

describe("PATCH /organizations/:idOrganization/users/:idOrganizationUser", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "PATCH",
            path: `/organizations/${idOrganization}/users/fake-id`,
            body: {
                isAdmin: true,
            },
        })
        expect(response.status).toBe(401)
    })

    it("accepts an empty body (idOrganizationUser in URL, all body fields optional)", async () => {
        const response = await authenticatedRequest({
            session,
            method: "PATCH",
            path: `/organizations/${idOrganization}/users/${idDemoOrganizationUser}`,
            body: {},
        })
        expect(response.status).toBe(200)
    })
})

describe("DELETE /organizations/:idOrganization/users/:idOrganizationUser", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "DELETE",
            path: `/organizations/${idOrganization}/users/fake-id`,
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests when idOrganizationUser is not found", async () => {
        const response = await authenticatedRequest({
            session,
            method: "DELETE",
            path: `/organizations/${idOrganization}/users/fake-id`,
        })
        expect(response.status).toBeGreaterThanOrEqual(400)
    })
})
