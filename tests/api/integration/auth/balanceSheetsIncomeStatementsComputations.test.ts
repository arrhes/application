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

describe("Balance Sheets", () => {
    describe("POST /auth/read-all-balance-sheets", () => {
        it("returns all balance sheets for the year", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/read-all-balance-sheets",
                body: { idOrganization, idYear },
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
            expect(data.length).toBeGreaterThan(0)

            const bs = data[0]
            expect(bs).toHaveProperty("id")
            expect(bs).toHaveProperty("label")
        })
    })
})

describe("Income Statements", () => {
    describe("POST /auth/read-all-income-statements", () => {
        it("returns all income statements for the year", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/read-all-income-statements",
                body: { idOrganization, idYear },
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
            expect(data.length).toBeGreaterThan(0)

            const is = data[0]
            expect(is).toHaveProperty("id")
            expect(is).toHaveProperty("label")
        })
    })
})

describe("Computations", () => {
    describe("POST /auth/read-all-computations", () => {
        it("returns all computations for the year", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/read-all-computations",
                body: { idOrganization, idYear },
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
            expect(data.length).toBeGreaterThan(0)

            const comp = data[0]
            expect(comp).toHaveProperty("id")
            expect(comp).toHaveProperty("label")
        })
    })
})
