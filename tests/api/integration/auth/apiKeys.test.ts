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

describe("GET /v1/organizations/:idOrganization/api-keys", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "GET",
            path: `/v1/organizations/${idOrganization}/api-keys`,
        })
        expect(response.status).toBe(401)
    })

    it("returns an array of API keys", async () => {
        const response = await authenticatedRequest({
            session,
            method: "GET",
            path: `/v1/organizations/${idOrganization}/api-keys`,
        })
        expect(response.status).toBe(200)
        expect(Array.isArray(response.data)).toBe(true)
    })
})

describe("POST /v1/organizations/:idOrganization/api-keys", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "POST",
            path: `/v1/organizations/${idOrganization}/api-keys`,
            body: {},
        })
        expect(response.status).toBe(401)
    })

    it("creates an API key without a name", async () => {
        const response = await authenticatedRequest({
            session,
            method: "POST",
            path: `/v1/organizations/${idOrganization}/api-keys`,
            body: {},
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
            method: "POST",
            path: `/v1/organizations/${idOrganization}/api-keys`,
            body: {
                name: "CI key",
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data.name).toBe("CI key")
        expect(data).toHaveProperty("rawKey")
    })
})

describe("DELETE /v1/organizations/:idOrganization/api-keys/:idApiKey", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "DELETE",
            path: `/v1/organizations/${idOrganization}/api-keys/fake-id`,
        })
        expect(response.status).toBe(401)
    })

    it("creates then deletes an API key", async () => {
        const createResponse = await authenticatedRequest({
            session,
            method: "POST",
            path: `/v1/organizations/${idOrganization}/api-keys`,
            body: {
                name: "to-delete",
            },
        })
        expect(createResponse.status).toBe(200)
        const idApiKey = (createResponse.data as any).id

        const deleteResponse = await authenticatedRequest({
            session,
            method: "DELETE",
            path: `/v1/organizations/${idOrganization}/api-keys/${idApiKey}`,
        })
        expect(deleteResponse.status).toBe(200)
    })
})
