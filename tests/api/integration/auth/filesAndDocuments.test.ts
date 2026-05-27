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

describe("Files", () => {
    describe("GET /v1/organizations/:idOrganization/years/:idYear/files", () => {
        it("returns all files for the year", async () => {
            const response = await authenticatedRequest({
                session,
                method: "GET",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/files`,
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
            // Seed data may or may not have files
        })
    })
})

describe("Folders", () => {
    describe("GET /v1/organizations/:idOrganization/years/:idYear/folders", () => {
        it("returns all folders for the year", async () => {
            const response = await authenticatedRequest({
                session,
                method: "GET",
                path: `/v1/organizations/${idOrganization}/years/${idYear}/folders`,
            })
            expect(response.status).toBe(200)

            const data = response.data as any[]
            expect(Array.isArray(data)).toBe(true)
            // Seed data may or may not have folders
        })
    })
})
