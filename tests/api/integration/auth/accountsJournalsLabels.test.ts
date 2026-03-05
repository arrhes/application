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
    describe("POST /auth/read-all-accounts", () => {
        it("returns all accounts for the year", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/read-all-accounts",
                body: { idOrganization, idYear },
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

    describe("POST /auth/create-one-account", () => {
        it("creates a new account", async () => {
            // Get existing accounts to find a parent class account
            const accountsResponse = await authenticatedRequest({
                session,
                path: "/auth/read-all-accounts",
                body: { idOrganization, idYear },
            })
            const accounts = accountsResponse.data as any[]
            const classAccount = accounts.find((a: any) => a.isClass === true)

            const number = `9${Date.now().toString().slice(-5)}`
            const response = await authenticatedRequest({
                session,
                path: "/auth/create-one-account",
                body: {
                    idOrganization,
                    idYear,
                    idAccountParent: classAccount?.id ?? null,
                    isClass: false,
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
    describe("POST /auth/read-all-journals", () => {
        it("returns all journals for the year", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/read-all-journals",
                body: { idOrganization, idYear },
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

    describe("POST /auth/create-one-journal", () => {
        it("creates a new journal", async () => {
            const code = `T${Date.now().toString(36).slice(-3).toUpperCase()}`
            const response = await authenticatedRequest({
                session,
                path: "/auth/create-one-journal",
                body: {
                    idOrganization,
                    idYear,
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

describe("Record Labels", () => {
    describe("POST /auth/read-all-record-labels", () => {
        it("returns all record labels for the year", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/read-all-record-labels",
                body: { idOrganization, idYear },
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
        })
    })

    describe("POST /auth/create-one-record-label", () => {
        it("creates a new record label", async () => {
            const label = `Test Label ${Date.now()}`
            const response = await authenticatedRequest({
                session,
                path: "/auth/create-one-record-label",
                body: {
                    idOrganization,
                    idYear,
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
