import { beforeAll, describe, expect, it } from "vitest"
import { type AuthSession, authenticatedRequest, getDemoOrganizationId, signInAsDemo } from "../../helpers/auth.js"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest } from "../../helpers/testClient.js"

let session: AuthSession
let idOrganization: string

beforeAll(async () => {
    await verifyApiIsRunning()
    session = await signInAsDemo()
    idOrganization = await getDemoOrganizationId(session)
})

describe("POST /auth/read-all-api-keys", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-all-api-keys",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(401)
    })

    it("returns an array of API keys", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-all-api-keys",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(200)
        expect(Array.isArray(response.data)).toBe(true)
    })
})

describe("POST /auth/create-one-api-key", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/create-one-api-key",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(401)
    })

    it("creates an API key without a name", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/create-one-api-key",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("id")
        expect(data).toHaveProperty("rawKey")
        expect(typeof data.rawKey).toBe("string")
        expect(data.rawKey.length).toBeGreaterThan(0)
    })

    it("creates an API key with a name", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/create-one-api-key",
            body: {
                idOrganization,
                name: "CI key",
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data.name).toBe("CI key")
        expect(data).toHaveProperty("rawKey")
    })
})

describe("POST /auth/delete-one-api-key", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/delete-one-api-key",
            body: {
                idOrganization,
                idApiKey: "fake-id",
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/delete-one-api-key",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("creates then deletes an API key", async () => {
        const createResponse = await authenticatedRequest({
            session,
            path: "/auth/create-one-api-key",
            body: {
                idOrganization,
                name: "to-delete",
            },
        })
        expect(createResponse.status).toBe(200)
        const idApiKey = (createResponse.data as any).id

        const deleteResponse = await authenticatedRequest({
            session,
            path: "/auth/delete-one-api-key",
            body: {
                idOrganization,
                idApiKey,
            },
        })
        expect(deleteResponse.status).toBe(200)
    })
})
