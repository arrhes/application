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

describe("Records", () => {
    describe("POST /auth/read-all-records", () => {
        it("returns all records for the year", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/read-all-records",
                body: { idOrganization, idYear },
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
            expect(data.length).toBeGreaterThan(0)

            const record = data[0]
            expect(record).toHaveProperty("id")
            expect(record).toHaveProperty("label")
            expect(record).toHaveProperty("date")
        })
    })

    describe("POST /auth/create-one-record", () => {
        it("creates a new record", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/create-one-record",
                body: {
                    idOrganization,
                    idYear,
                    label: "Test Record",
                    date: "2023-06-15T00:00:00.000Z",
                },
            })
            expect(response.status).toBe(200)

            const data = response.data as any
            expect(data).toHaveProperty("id")
            expect(data.label).toBe("Test Record")
        })

        it("rejects missing required fields", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/create-one-record",
                body: { idOrganization, idYear },
            })
            expect(response.status).toBe(400)
        })
    })
})

describe("Record Rows", () => {
    describe("POST /auth/read-all-record-rows", () => {
        it("returns all record rows for the year", async () => {
            const response = await authenticatedRequest({
                session,
                path: "/auth/read-all-record-rows",
                body: { idOrganization, idYear },
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
            expect(data.length).toBeGreaterThan(0)

            const row = data[0]
            expect(row).toHaveProperty("id")
            expect(row).toHaveProperty("idRecord")
            expect(row).toHaveProperty("idAccount")
        })
    })

    describe("POST /auth/create-one-record-row", () => {
        it("creates a new record row on an existing record", async () => {
            // Get a record and an account
            const recordsResponse = await authenticatedRequest({
                session,
                path: "/auth/read-all-records",
                body: { idOrganization, idYear },
            })
            const records = recordsResponse.data as any[]
            const idRecord = records[0].id

            const accountsResponse = await authenticatedRequest({
                session,
                path: "/auth/read-all-accounts",
                body: { idOrganization, idYear },
            })
            const accounts = accountsResponse.data as any[]
            const selectableAccount = accounts.find((a: any) => a.isSelectable === true)

            const response = await authenticatedRequest({
                session,
                path: "/auth/create-one-record-row",
                body: {
                    idOrganization,
                    idYear,
                    idRecord,
                    idAccount: selectableAccount.id,
                    isComputedForJournalReport: true,
                    isComputedForLedgerReport: true,
                    isComputedForBalanceReport: true,
                    isComputedForBalanceSheetReport: true,
                    isComputedForIncomeStatementReport: true,
                    label: "Test Row",
                    debit: "100.00",
                    credit: "0",
                },
            })
            expect(response.status).toBe(200)

            const data = response.data as any
            expect(data).toHaveProperty("id")
            expect(data.idRecord).toBe(idRecord)
            expect(data.label).toBe("Test Row")
        })
    })
})
