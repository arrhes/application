import { beforeAll, describe, expect, it } from "vitest"
import { type AuthSession, authenticatedRequest, getDemoYearId, signInAsDemo } from "../../helpers/auth.js"
import { verifyApiIsRunning } from "../../helpers/setup.js"

let session: AuthSession
let idOrganization: string
let idYear: string

beforeAll(async () => {
    await verifyApiIsRunning()
    session = await signInAsDemo()
    const demo = await getDemoYearId(session)
    idOrganization = demo.idOrganization
    idYear = demo.idYear
})

describe("Accounts", () => {
    describe("GET /v1/organizations/:idOrganization/years/:idYear/accounts", () => {
        it("returns all accounts for the year", async () => {
            const response = await authenticatedRequest({
                session,
                method: "GET",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/accounts`,
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
            expect(data.length).toBeGreaterThan(0)

            const account = data[0]
            expect(account).toHaveProperty("id")
            expect(account).toHaveProperty("number")
            expect(account).toHaveProperty("label")
            expect(account).toHaveProperty("type")
        })
    })

    describe("POST /v1/organizations/:idOrganization/years/:idYear/accounts", () => {
        it("creates a new account", async () => {
            // Get existing accounts to find a parent class account
            const accountsResponse = await authenticatedRequest({
                session,
                method: "GET",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/accounts`,
            })
            const accounts = accountsResponse.data as any[]
            const classAccount = accounts.find((a: any) => a.number.length <= 2)

            const number = `9${Date.now().toString().slice(-5)}`
            const response = await authenticatedRequest({
                session,
                method: "POST",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/accounts`,
                body: {
                    idAccountParent: classAccount?.id ?? null,
                    isSelectable: true,
                    number,
                    label: "Test Account",
                    type: "balance-sheet",
                },
            })
            expect(response.status).toBe(200)

            const data = response.data as any
            expect(data).toHaveProperty("id")
            expect(data.number).toBe(number)
            expect(data.label).toBe("Test Account")
        })
    })
})

describe("Journals", () => {
    describe("GET /v1/organizations/:idOrganization/years/:idYear/journals", () => {
        it("returns all journals for the year", async () => {
            const response = await authenticatedRequest({
                session,
                method: "GET",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/journals`,
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
            expect(data.length).toBeGreaterThan(0)

            const journal = data[0]
            expect(journal).toHaveProperty("id")
            expect(journal).toHaveProperty("code")
            expect(journal).toHaveProperty("label")
        })
    })

    describe("POST /v1/organizations/:idOrganization/years/:idYear/journals", () => {
        it("creates a new journal", async () => {
            const code = `T${Date.now().toString(36).slice(-3).toUpperCase()}`
            const response = await authenticatedRequest({
                session,
                method: "POST",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/journals`,
                body: {
                    code,
                    label: `Test Journal ${Date.now()}`,
                },
            })
            expect(response.status).toBe(200)

            const data = response.data as any
            expect(data).toHaveProperty("id")
            expect(data.code).toBe(code)
            expect(data).toHaveProperty("label")
        })
    })
})

describe("Tags", () => {
    describe("GET /v1/organizations/:idOrganization/years/:idYear/tags", () => {
        it("returns all tags for the year", async () => {
            const response = await authenticatedRequest({
                session,
                method: "GET",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/tags`,
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
        })
    })

    describe("POST /v1/organizations/:idOrganization/years/:idYear/tags", () => {
        it("creates a new tag", async () => {
            const label = `Test Tag ${Date.now()}`
            const response = await authenticatedRequest({
                session,
                method: "POST",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/tags`,
                body: {
                    label,
                },
            })
            expect(response.status).toBe(200)

            const data = response.data as any
            expect(data).toHaveProperty("id")
            expect(data.label).toBe(label)
        })
    })
})
