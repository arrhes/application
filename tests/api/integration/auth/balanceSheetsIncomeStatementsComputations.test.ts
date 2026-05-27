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
    describe("GET /v1/organizations/:idOrganization/years/:idYear/balance-sheets", () => {
        it("returns all balance sheets for the year", async () => {
            const response = await authenticatedRequest({
                session,
                method: "GET",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/balance-sheets`,
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
    describe("GET /v1/organizations/:idOrganization/years/:idYear/income-statements", () => {
        it("returns all income statements for the year", async () => {
            const response = await authenticatedRequest({
                session,
                method: "GET",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/income-statements`,
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
    describe("GET /v1/organizations/:idOrganization/years/:idYear/computations", () => {
        it("returns all computations for the year", async () => {
            const response = await authenticatedRequest({
                session,
                method: "GET",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/computations`,
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
