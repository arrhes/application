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

describe("GET /organizations/:idOrganization/years", () => {
    it("returns all years for the organization", async () => {
        const response = await authenticatedRequest({
            session,
            method: "GET",
            path: `/organizations/${idOrganization}/years`,
        })
        expect(response.status).toBe(200)

        const data = response.data as any[]
        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBeGreaterThanOrEqual(1)

        const year = data[0]
        expect(year).toHaveProperty("id")
        expect(year).toHaveProperty("idOrganization")
        expect(year).toHaveProperty("startingAt")
        expect(year).toHaveProperty("endingAt")
    })

    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "GET",
            path: `/organizations/${idOrganization}/years`,
        })
        expect(response.status).toBe(401)
    })
})

describe("POST /organizations/:idOrganization/years", () => {
    it("creates a new year for the organization", async () => {
        const response = await authenticatedRequest({
            session,
            method: "POST",
            path: `/organizations/${idOrganization}/years`,
            body: {
                startingAt: "2099-01-01T00:00:00.000Z",
                endingAt: "2099-12-31T23:59:59.999Z",
                label: `Test Year ${Date.now()}`,
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("id")
        expect(data.idOrganization).toBe(idOrganization)
        expect(data).toHaveProperty("label")
    })

    it("rejects missing required fields", async () => {
        const response = await authenticatedRequest({
            session,
            method: "POST",
            path: `/organizations/${idOrganization}/years`,
            body: {},
        })
        expect(response.status).toBe(400)
    })
})

describe("GET /organizations/:idOrganization/years/:idYear", () => {
    it("reads a specific year by id", async () => {
        // Get all years first
        const yearsResponse = await authenticatedRequest({
            session,
            method: "GET",
            path: `/organizations/${idOrganization}/years`,
        })
        const years = yearsResponse.data as any[]
        const idYear = years[0].id

        const response = await authenticatedRequest({
            session,
            method: "GET",
            path: `/organizations/${idOrganization}/years/${idYear}`,
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data.id).toBe(idYear)
        expect(data).toHaveProperty("startingAt")
        expect(data).toHaveProperty("endingAt")
    })
})
